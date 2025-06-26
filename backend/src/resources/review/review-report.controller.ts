import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    UseGuards,
    Request,
    ParseIntPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewReportService } from './review-report.service';
import { CreateReviewReportDto } from './dto/create-review-report.dto';
import { JwtAuthGuard } from '@/resources/auth/guards/jwt-auth.guard';
import { AdminGuard } from '@/common/guards/admin.guard';
import { AdminOnly } from '@/common/decorators/admin.decorator';

@ApiTags('review-reports')
@Controller('review-reports')
@UseGuards(JwtAuthGuard, AdminGuard)
@ApiBearerAuth()
export class ReviewReportController {
  constructor(private readonly reviewReportService: ReviewReportService) {}

  @ApiOperation({ summary: 'Signaler un avis' })
  @ApiResponse({
    status: 201,
    description: 'Avis signalé avec succès',
  })
  @ApiResponse({
    status: 400,
    description: 'Requête invalide (avis déjà signalé ou propre avis)',
  })
  @ApiResponse({
    status: 404,
    description: 'Avis non trouvé',
  })
  @Post()
  async create(@Body() createReviewReportDto: CreateReviewReportDto, @Request() req) {
    const reporterId = req.user.userId;
    return await this.reviewReportService.create(createReviewReportDto, reporterId);
  }

  @ApiOperation({ summary: 'Récupérer tous les signalements (admin seulement)' })
  @ApiResponse({
    status: 200,
    description: 'Liste des signalements récupérée avec succès',
  })
  @AdminOnly()
  @Get()
  async findAll() {
    return await this.reviewReportService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer les signalements d\'un avis spécifique (admin seulement)' })
  @ApiResponse({
    status: 200,
    description: 'Signalements de l\'avis récupérés avec succès',
  })
  @AdminOnly()
  @Get('review/:reviewId')
  async findByReviewId(@Param('reviewId', ParseIntPipe) reviewId: number) {
    return await this.reviewReportService.findByReviewId(reviewId);
  }

  @ApiOperation({ summary: 'Mettre à jour le statut d\'un signalement (admin seulement)' })
  @ApiResponse({
    status: 200,
    description: 'Statut du signalement mis à jour avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Signalement non trouvé',
  })
  @AdminOnly()
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { status: 'pending' | 'reviewed' | 'resolved' | 'dismissed' }
  ) {
    return await this.reviewReportService.updateStatus(id, body.status);
  }
} 