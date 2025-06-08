import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { RestaurantService } from '../restaurant/restaurant.service';
import { UserModule } from '../user/user.module';


@Module({ imports: [
        TypeOrmModule.forFeature([Report]),
        RestaurantModule,
        UserModule
      ],
      controllers: [ReportController],
      providers: [ReportService],
      exports: [ReportService]})
export class ReportModule {  }
