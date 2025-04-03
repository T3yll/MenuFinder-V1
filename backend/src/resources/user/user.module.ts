import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/resources/user/entities/user.entity';
import { UserService } from '@/resources/user/user.service';
import { UserController } from '@/resources/user/user.controller';
import { UserDetail } from './entities/user-detail.entity';
import { Grade } from './entities/grade.entity';
import { Team } from '../team/entities/team.entity';
import { TeamsModule } from '../team/team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserDetail, Grade, Team]),
    TeamsModule,
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
