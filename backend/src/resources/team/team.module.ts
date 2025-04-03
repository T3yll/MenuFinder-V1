import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '@/resources/team/entities/team.entity';
import { TeamService } from '@/resources/team/team.service';
import { TeamController } from '@/resources/team/team.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Team]),
  ],
  providers: [TeamService],
  controllers: [TeamController],
  exports: [TypeOrmModule, TeamService],
})
export class TeamsModule {}
