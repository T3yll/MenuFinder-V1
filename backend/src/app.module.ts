import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@/resources/user/user.module';
import { AuthModule } from '@/resources/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/resources/auth/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './resources/review/review.module';
import { RestaurantModule } from './resources/restaurant/restaurant.module';
import { TagModule } from './resources/tag/tag.module';
import { MenuModule } from './resources/menu/menu.module';
import { RestauranttagModule } from './resources/restauranttag/restauranttag.module';
import { ResponseModule } from './resources/response/response.module';
import { BookmarkModule } from './resources/bookmark/bookmark.module';
import { AdressModule } from './resources/adress/adress.module';
import { FileModule } from './resources/file/file.module';
import { MealModule } from './resources/meal/meal.module';
import { MealCategoryModule } from './resources/mealcategory/mealcategory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    RestaurantModule,
    ReviewModule,
    TagModule,
    MenuModule,
    ResponseModule,
    BookmarkModule,
    AdressModule,
    FileModule,
    MealModule,
    MealCategoryModule,
    RestauranttagModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
