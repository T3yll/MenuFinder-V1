import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from '@/resources/feature/feature.entity';
import { FeatureService } from '@/resources/feature/feature.service';
import { FeatureController } from '@/resources/feature/feature.controller';
import { AuthModule } from '@/resources/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Feature])],
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [TypeOrmModule, FeatureService],
})
export class FeatureModule {}
