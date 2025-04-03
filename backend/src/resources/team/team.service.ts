import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Team } from '@/resources/team/entities/team.entity';
import { CreateTeamDto } from '@/resources/team/dto/create-team.dto';
import { UpdateTeamDto } from '@/resources/team/dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async findAll(query: {
    page?: number;
    offset?: number;
    search?: string;
    userId?: number;
  }) {
    const { page = 1, offset = 10, search, userId } = query;
    const queryBuilder = this.teamRepository.createQueryBuilder('team');

    if (search) {
      queryBuilder.where('team.label ILIKE :search', { search: `%${search}%` });
    }

    // FindAllByUser
    if (userId) {
      queryBuilder
        .leftJoinAndSelect('team.users', 'user')
        .andWhere('user.id = :userId', { userId });
    }

    const [data, totalRecords] = await queryBuilder
      .skip((page - 1) * offset)
      .take(offset)
      .orderBy('team.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      totalRecords,
    };
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id }
    });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  create(teamData: CreateTeamDto): Promise<Team> {
    const team = this.teamRepository.create(teamData);
    return this.teamRepository.save(team);
  }

  async update(id: number, teamData: UpdateTeamDto): Promise<Team> {
    const team = await this.findOne(id);
    Object.assign(team, teamData);
    return this.teamRepository.save(team);
  }

  async remove(id: number): Promise<void> {
    const team = await this.findOne(id);
    await this.teamRepository.delete(id);
  }
}
