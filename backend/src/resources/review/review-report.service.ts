import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewReport } from './entities/review-report.entity';
import { Review } from './entities/review.entity';
import { CreateReviewReportDto } from './dto/create-review-report.dto';

@Injectable()
export class ReviewReportService {
  constructor(
    @InjectRepository(ReviewReport)
    private reviewReportRepository: Repository<ReviewReport>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewReportDto: CreateReviewReportDto, reporterId: number): Promise<ReviewReport> {
    // Vérifier que l'avis existe
    const review = await this.reviewRepository.findOne({
      where: { review_id: createReviewReportDto.review_id }
    });

    if (!review) {
      throw new NotFoundException('Avis non trouvé');
    }

    // Vérifier que l'utilisateur ne signale pas son propre avis
    if (review.user_id === reporterId) {
      throw new BadRequestException('Vous ne pouvez pas signaler votre propre avis');
    }

    // Vérifier que l'utilisateur n'a pas déjà signalé cet avis
    const existingReport = await this.reviewReportRepository.findOne({
      where: {
        review_id: createReviewReportDto.review_id,
        reporter_user_id: reporterId
      }
    });

    if (existingReport) {
      throw new BadRequestException('Vous avez déjà signalé cet avis');
    }

    // Créer le signalement
    const reviewReport = this.reviewReportRepository.create({
      review_id: createReviewReportDto.review_id,
      reporter_user_id: reporterId,
      status: createReviewReportDto.status || 'pending'
    });

    return await this.reviewReportRepository.save(reviewReport);
  }

  async findAll(): Promise<ReviewReport[]> {
    return await this.reviewReportRepository.find({
      relations: ['review', 'reporter'],
      order: { reported_at: 'DESC' }
    });
  }

  async findByReviewId(reviewId: number): Promise<ReviewReport[]> {
    return await this.reviewReportRepository.find({
      where: { review_id: reviewId },
      relations: ['reporter'],
      order: { reported_at: 'DESC' }
    });
  }

  async updateStatus(reportId: number, status: 'pending' | 'reviewed' | 'resolved' | 'dismissed'): Promise<ReviewReport> {
    const report = await this.reviewReportRepository.findOne({
      where: { report_id: reportId }
    });

    if (!report) {
      throw new NotFoundException('Signalement non trouvé');
    }

    report.status = status;
    return await this.reviewReportRepository.save(report);
  }
} 