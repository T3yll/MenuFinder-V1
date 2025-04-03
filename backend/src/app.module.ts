import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoModule } from '@/resources/info/info.module';
import { FeatureModule } from '@/resources/feature/feature.module';
import { TeamsModule } from '@/resources/team/team.module';
import { FeatureToggleMiddleware } from '@/common/middlewares/feature-toggle.middleware';
import { UserModule } from '@/resources/user/user.module';
import { AuthModule } from '@/resources/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/resources/auth/guards/jwt-auth.guard';
import { UniteModule } from './resources/unite/unite.module';
import { ConfigModule } from '@nestjs/config';

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
    UniteModule,
    FeatureModule,
    TeamsModule,
    AuthModule,
    InfoModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FeatureToggleMiddleware).forRoutes('*');
  }
}
