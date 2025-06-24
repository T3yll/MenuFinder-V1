import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { instance } from '@/common/logger/winston.logger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  app.useStaticAssets(join(__dirname, '..', 'seeder','samples'), {
    prefix: '/samples',
  });

  const port = process.env.PORT ?? 4000;

  // Config Swagger
  const config = new DocumentBuilder()
    .setTitle('Menufinder')
    .setDescription("Documentation de l'API")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  writeFileSync('./swagger.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforme automatiquement les payloads en leur bonne forme
      whitelist: true, // Supprime les propriétés qui n'ont pas de décorateurs
      forbidNonWhitelisted: true, // Rejette les requêtes qui contiennent des propriétés non autorisées
    }),
  );
  await app.listen(port);
}

bootstrap();
