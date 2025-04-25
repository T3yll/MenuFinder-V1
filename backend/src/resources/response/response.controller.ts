import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Response } from './entities/response.entity';
import { ResponseService } from './response.service';

@Controller('responses')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  create(@Body() response: Response): Promise<Response> {
    return this.responseService.create(response);
  }

  @Get()
  findAll(): Promise<Response[]> {
    return this.responseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Response> {
    return this.responseService.findOne(+id);
  }

  @Get('avis/:id')
  findByAvis(@Param('id') id: string): Promise<Response[]> {
    return this.responseService.findByAvis(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() reponse: Response): Promise<Response> {
    return this.responseService.update(+id, reponse);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.responseService.remove(+id);
  }
}