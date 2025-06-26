import { IsNumber, IsOptional, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewReportDto {
  @ApiProperty({ description: 'ID de l\'avis à signaler' })
  @IsNumber()
  review_id: number;

  @ApiProperty({ 
    description: 'Statut du signalement',
    enum: ['pending', 'reviewed', 'resolved', 'dismissed'],
    default: 'pending',
    required: false 
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'reviewed', 'resolved', 'dismissed'])
  status?: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
} 