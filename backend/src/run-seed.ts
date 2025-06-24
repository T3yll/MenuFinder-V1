// seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Seeder from './seeder/seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(Seeder);

  await seeder.seed();

  console.log('✅ Seeding terminé');
  await app.close();
}

bootstrap();
