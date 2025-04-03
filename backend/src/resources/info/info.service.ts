import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInfoDto } from '@/resources/info/dto/create-info.dto';
import { UpdateInfoDto } from '@/resources/info/dto/update-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Info } from '@/resources/info/entities/info.entity';
import { Team } from '@/resources/team/entities/team.entity';
import { In, Repository } from 'typeorm';
import { User } from '@/resources/user/entities/user.entity';

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(Info)
    private infosRepository: Repository<Info>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>
  ) {}

  async create(createInfoDto: CreateInfoDto, userId: number): Promise<Info> {
    const { teamIds, ...infoData } = createInfoDto;

    let teams = [];
    if (teamIds && teamIds.length > 0) {
      teams = await this.teamsRepository.findBy({ id: In(teamIds) });
      if (teams.length !== teamIds.length) {
        throw new NotFoundException(`One or more teams not found`);
      }
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });

    const info = this.infosRepository.create({
      ...infoData,
      teams,
      createdBy: user,
    });

    await this.infosRepository.save(info);

    return this.findOne(info.id);
  }

  async findAll(query: {
    page?: number;
    offset?: number;
    search?: string;
    teamId?: number;
  }) {
    const { page = 1, offset = 10, search, teamId } = query;

    const queryBuilder = this.infosRepository
      .createQueryBuilder('info')
      .leftJoinAndSelect('info.teams', 'team')
      .leftJoinAndSelect('info.createdBy', 'createdBy')
      .leftJoinAndSelect('info.updatedBy', 'updatedBy');

    // Filtrer par teamId avec une jointure, évitant ainsi les sous-requêtes complexes
    if (teamId) {
      queryBuilder
        .leftJoin('info_teams', 'info_teams', 'info.id = info_teams.infoId')
        .where('info_teams.teamId = :teamId OR info_teams.infoId IS NULL', {
          teamId,
        });
    }

    // Filtrer par search
    if (search) {
      queryBuilder.andWhere('info.label ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const [data, totalRecords] = await queryBuilder
      .skip((page - 1) * offset)
      .take(offset)
      .orderBy('info.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      totalRecords,
    };
  }

  async findOne(id: number): Promise<Info> {
    const info = await this.infosRepository.findOne({
      where: { id },
      relations: ['teams', 'createdBy', 'updatedBy'],
    });

    if (!info) {
      throw new NotFoundException(`Info with ID ${id} not found`);
    }

    return info;
  }

  async update(
    id: number,
    updateInfoDto: UpdateInfoDto,
    userId: number
  ): Promise<Info> {
    const info = await this.findOne(id);

    const user = await this.usersRepository.findOne({ where: { id: userId } });

    const { teamIds, ...updateData } = updateInfoDto;

    Object.assign(info, updateData);

    if (teamIds) {
      const teams = await this.teamsRepository.findBy({ id: In(teamIds) });
      if (teams.length !== teamIds.length) {
        throw new NotFoundException(`One or more teams not found`);
      }
      info.teams = teams;
    }

    info.updatedBy = user;

    return this.infosRepository.save(info);

    return this.findOne(info.id);
  }

  async remove(id: number): Promise<void> {
    const info = await this.findOne(id);
    await this.infosRepository.delete(info.id);
  }
}
