import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { FeatureService } from '@/resources/feature/feature.service';
import { CreateFeatureDto } from '@/resources/feature/dto/create-feature.dto';
import { UpdateFeatureDto } from '@/resources/feature/dto/update-feature.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('feature')
@Controller('features')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @ApiOperation({ summary: 'Create a new feature' })
  @ApiBody({ type: CreateFeatureDto })
  @ApiResponse({
    status: 201,
    description: 'The feature has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featureService.create(createFeatureDto);
  }

  @ApiOperation({ summary: 'Retrieve all features' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all features',
  })
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('offset') offset = 10,
    @Query('search') search?: string
  ) {
    return this.featureService.findAll(page, offset, search);
  }

  @ApiOperation({ summary: 'Retrieve a feature by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved feature' })
  @ApiResponse({ status: 404, description: 'Feature not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.featureService.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Feature with ID ${id} not found`);
      }
      throw error;
    }
  }

  @ApiOperation({ summary: 'Update a feature by ID' })
  @ApiBody({ type: UpdateFeatureDto })
  @ApiResponse({
    status: 200,
    description: 'Feature has been updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Feature not found' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFeatureDto: UpdateFeatureDto
  ) {
    try {
      return await this.featureService.update(+id, updateFeatureDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Remove a feature by ID' })
  @ApiResponse({ status: 200, description: 'Feature successfully removed' })
  @ApiResponse({ status: 404, description: 'Feature not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.featureService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
