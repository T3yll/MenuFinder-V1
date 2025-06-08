import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';


@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>,
    ) {}

    async create(createReportDto: CreateReportDto): Promise<Report> {
        const report = this.reportRepository.create(createReportDto);
        return this.reportRepository.save(report);
    }

    async findAll(): Promise<Report[]> {
        return this.reportRepository.find();
    }

    async findOne(id: number): Promise<Report> {
        const report = await this.reportRepository.findOne({ where: { id } });
        if (!report) {
            throw new NotFoundException(`Report with id ${id} not found`);
        }
        return report;
    }

    async findByRestaurant(restaurantId: number): Promise<Report[]> {
        return this.reportRepository.find({
            where: { restaurantId: restaurantId },
        });
    }

    async remove(id: number): Promise<void> {
        const result = await this.reportRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Report with id ${id} not found`);
        }
    }

    async resolve(id: number): Promise<Report> {
        const report = await this.findOne(id);
        report.isResolved = true;
        return this.reportRepository.save(report);
    }
}