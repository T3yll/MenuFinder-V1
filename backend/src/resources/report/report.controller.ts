

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@/common/decorators/security/public.decorator';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';

@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
  ) {}

  @Public()
  @Post()
  create(@Body() createRestaurantDto: CreateReportDto): Promise<Report> {
    return this.reportService.create(createRestaurantDto);
  }

  @Public()
  @Get()
  findAll(): Promise<Report[]> {
    return this.reportService.findAll();
  }

  @Get('count')
  @ApiOperation({ summary: 'Get the total number of reports' })
  @ApiResponse({
    status: 200,
    description: 'The total number of reports',
    type: Number,
  })
  async count(): Promise<object> {
    return {code:200,count : await this.reportService.count()};
  }

  

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Report> {
    return this.reportService.findOne(+id);
  }

  @Public()
  @Get('/restaurant/:id')
  getRestaurantMenus(@Param('id') id: string): Promise<Report[]> {
    return this.reportService.findByRestaurant(+id);
  }


  @Public()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.reportService.remove(+id);
  }

  @Public()
  @Put(':id')
  resolve(@Param('id') id: string): Promise<Report> {
        return this.reportService.resolve(+id);
  }

}