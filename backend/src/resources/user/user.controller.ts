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
import { get } from 'http';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
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


  @Get('count')
  @ApiOperation({ summary: 'Get the total number of users' })
  @ApiResponse({
    status: 200,
    description: 'The total number of users',
    type: Number,
  })
  async count(): Promise<object> {
    return {code:200,count : await this.userService.count()};
  }

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
      await this.userService.update(+id, updateUserDto);
      return await this.userService.selectPublicInfo(+id);
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
}
