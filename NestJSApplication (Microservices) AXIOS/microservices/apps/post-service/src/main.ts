import { NestFactory } from '@nestjs/core';
import { PostServiceModule } from './post-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PostServiceModule)
  await app.listen(3015);
  console.log('Post Service di Port:3015')
}
bootstrap();
