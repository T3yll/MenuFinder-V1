import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
  Put,
  Query,
} from '@nestjs/common';
import { TeamService } from '@/resources/team/team.service';
import { Team } from '@/resources/team/entities/team.entity';
import { CreateTeamDto } from '@/resources/team/dto/create-team.dto';
import { UpdateTeamDto } from '@/resources/team/dto/update-team.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}
  @ApiOperation({ summary: 'Retrieve all teams' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all teams' })
  @Get()
  findAll(
    @Query() query: { page?: number; offset?: number; search?: string, userId?: number }
  ) {
    return this.teamService.findAll(query);
  }

  @ApiOperation({ summary: 'Retrieve a single team by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved team' })
  @ApiResponse({ status: 404, description: 'Team not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Team> {
    try {
      return await this.teamService.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Team with ID ${id} not found`);
      }
      throw error;
    }
  }
  @ApiOperation({ summary: 'Create a new team' })
  @ApiBody({ type: CreateTeamDto })
  @ApiResponse({
    status: 201,
    description: 'The team has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @ApiOperation({ summary: 'Update a team by ID' })
  @ApiBody({ type: UpdateTeamDto })
  @ApiResponse({ status: 200, description: 'Team successfully updated' })
  @ApiResponse({ status: 404, description: 'Team not found' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() team: UpdateTeamDto
  ): Promise<Team> {
    try {
      return await this.teamService.update(+id, team);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete a team by ID' })
  @ApiResponse({ status: 200, description: 'Team successfully deleted' })
  @ApiResponse({ status: 404, description: 'Team not found' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.teamService.remove(+id);
    } catch (error) {
      throw error;
    }
  }

  // @ApiOperation({ summary: 'Retrieve all teams by user ID' })
  // @ApiResponse({ status: 200, description: 'Successfully retrieved all teams for user' })
  // @ApiResponse({ status: 404, description: 'User not found' })
  // @Get('user/:userId')
  // async findAllTeamsByUser(@Param('userId') userId: string) {
  //   try {
  //     return await this.teamService.findAllTeamsByUser(+userId);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

}
