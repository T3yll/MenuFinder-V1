import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '@/resources/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
    });
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.entries(updateUserDto).forEach(([key, value]) => {
      (user as any)[key] = value;
    });

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.delete(id);
  }
}