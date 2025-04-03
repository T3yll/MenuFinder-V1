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
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from '@/resources/auth/dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Public } from '@/common/decorators/security/public.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all users' })
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('offset') offset = 10,
    @Query('search') search?: string
  ) {
    return this.userService.findAll(page, offset, search);
  }

  @ApiOperation({ summary: 'Retrieve a single user by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  @Public()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    try {
      return await this.userService.update(+id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.userService.remove(+id);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update user teams' })
  @ApiResponse({ status: 200, description: 'Teams successfully updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Put(':id/teams')
  async updateUserTeams(
    @Param('id') userId: number,
    @Body('teamIds') teamIds: number[]
  ) {
    return this.userService.updateTeams(userId, teamIds);
  }

  @ApiOperation({ summary: 'Set user current team' })
  @ApiResponse({
    status: 200,
    description: 'Current team successfully updated',
  })
  @ApiResponse({ status: 404, description: 'User or team not found' })
  @Put(':id/team/:teamId')
  async setCurrentTeam(
    @Param('id') userId: number,
    @Param('teamId') teamId: number
  ) {
    return this.userService.setCurrentTeam(userId, teamId);
  }

  @Post(':userId/teams/:teamId')
  async addTeamToUser(@Param('userId') userId: number, @Param('teamId') teamId: number) {
    return this.userService.addTeamToUser(userId, teamId);
  }

}
