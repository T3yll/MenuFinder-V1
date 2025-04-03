import { forwardRef, Module } from '@nestjs/common';
import { InfoService } from '@/resources/info/info.service';
import { InfoController } from '@/resources/info/info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Info } from '@/resources/info/entities/info.entity';
import { AuthModule } from '@/resources/auth/auth.module';
import { TeamsModule } from '@/resources/team/team.module';
import { User } from '@/resources/user/entities/user.entity';
import { UserModule } from '@/resources/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TeamsModule,
    TypeOrmModule.forFeature([Info, User]),
  ],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
