import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '@/resources/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Team } from '@/resources/team/entities/team.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>
  ) {}

  async findAll(page: number = 1, offset: number = 10, search?: string) {
    const query = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userDetail', 'userDetail')
      .leftJoinAndSelect('user.teams', 'teams');

    if (search) {
      query.where('user.username ILIKE :search', { search: `%${search}%` });
    }

    const [data, totalRecords] = await query
      .skip((page - 1) * offset)
      .take(offset)
      .orderBy('user.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      totalRecords,
    };
  }

  async addTeamToUser(userId: number, teamId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['teams'],
    });
    const team = await this.teamRepository.findOne({ where: { id: teamId } });

    if (!user || !team) {
      throw new NotFoundException('User or Team not found');
    }

    user.teams.push(team);
    await this.teamRepository.save(team);
    await this.usersRepository.save(user);

    return this.usersRepository.findOne({
      where: { id: userId },
      relations: ['teams'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['teams'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds
    );

    const { username, password, ...userDetailFields } = createUserDto;

    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
      userDetail: userDetailFields, // Champs restants pour UserDetail
    });
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.entries(updateUserDto).forEach(([key, value]) => {
      user.set(key, value);
    });

    return this.usersRepository.save(user);
  }

  async updateTeams(id: number, teamIds: number[]): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['teams'],
    });
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found.`);
    }
    const teams = await this.teamRepository.find({
      where: { id: In(teamIds) },
    });
    if (teams.length !== teamIds.length) {
      const foundIds = teams.map((p) => p.id);
      const missingIds = teamIds.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(
        `Following team ids not found: ${missingIds.join(', ')}`
      );
    }
    user.teams = teams;
    return this.usersRepository.save(user);
  }

  async setCurrentTeam(userId: number, teamId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['teams'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const team = user.teams.find((t) => t.id === Number(teamId)); // Conversion explicite de teamId en nombre

    if (!team) {
      throw new NotFoundException(
        `Team with ID ${teamId} is not assigned to this user`
      );
    }

    user.currentTeam = team;
    await this.usersRepository.save(user);

    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.delete(id);
  }
}