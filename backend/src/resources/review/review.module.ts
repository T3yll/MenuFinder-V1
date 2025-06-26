import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewReportService } from './review-report.service';
import { ReviewReportController } from './review-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewReport } from './entities/review-report.entity';
import { AdminGuard } from '@/common/guards/admin.guard';
import { UserModule } from '@/resources/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, ReviewReport]),
    UserModule
  ],
  controllers: [ReviewController, ReviewReportController],
  providers: [ReviewService, ReviewReportService, AdminGuard],
})
export class ReviewModule {}
