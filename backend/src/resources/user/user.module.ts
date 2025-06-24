import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/resources/user/entities/user.entity';
import { UserService } from '@/resources/user/user.service';
import { UserController } from '@/resources/user/user.controller';
import { FileService } from '@/resources/file/file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
