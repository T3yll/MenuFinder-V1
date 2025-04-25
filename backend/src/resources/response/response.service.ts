import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './entities/response.entity';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
  ) {}

  create(reponse: Response): Promise<Response> {
    return this.responseRepository.save(reponse);
  }

  findAll(): Promise<Response[]> {
    return this.responseRepository.find();
  }

  findOne(id: number): Promise<Response> {
    return this.responseRepository.findOne({ where: { response_id: id } });
  }

  findByAvis(reviewId: number): Promise<Response[]> {
    return this.responseRepository.find({ where: { review_id: reviewId } });
  }

  async update(id: number, response: Response): Promise<Response> {
    await this.responseRepository.update(id, response);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.responseRepository.delete(id);
  }
}