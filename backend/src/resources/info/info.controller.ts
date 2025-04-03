import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InfoService } from '@/resources/info/info.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { CreateInfoDto } from '@/resources/info/dto/create-info.dto';
import { UpdateInfoDto } from '@/resources/info/dto/update-info.dto';
import { IUserPayload } from '@/resources/user/IUserPayload';
@ApiTags('infos')
@Controller('infos')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @ApiOperation({ summary: 'Create new info' })
  @ApiBody({ type: CreateInfoDto })
  @ApiResponse({
    status: 201,
    description: 'The info has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  create(@Req() req, @Body() createInfoDto: CreateInfoDto) {
    const userPayload: IUserPayload = req.user;

    return this.infoService.create(createInfoDto, userPayload.userId);
  }

  @ApiOperation({ summary: 'Retrieve all infos' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all infos' })
  @Get()
  findAll(
    @Query()
    query: {
      page?: number;
      offset?: number;
      search?: string;
      teamId?: number;
    }
  ) {
    return this.infoService.findAll(query);
  }

  @ApiOperation({ summary: 'Retrieve a single info by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved info' })
  @ApiResponse({ status: 404, description: 'Info not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.infoService.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Info with ID ${id} not found`);
      }
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update info by ID' })
  @ApiBody({ type: UpdateInfoDto })
  @ApiResponse({
    status: 200,
    description: 'Info has been updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Info not found' })
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateInfoDto: UpdateInfoDto
  ) {
    try {
      const userPayload: IUserPayload = req.user;

      return await this.infoService.update(
        +id,
        updateInfoDto,
        userPayload.userId
      );
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Remove info by ID' })
  @ApiResponse({ status: 200, description: 'Info successfully removed' })
  @ApiResponse({ status: 404, description: 'Info not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.infoService.remove(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Info with ID ${id} not found`);
      }
      throw error;
    }
  }
}
