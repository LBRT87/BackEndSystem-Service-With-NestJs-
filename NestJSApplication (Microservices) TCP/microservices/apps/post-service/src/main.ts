import { NestFactory } from '@nestjs/core';
import { PostServiceModule } from './post-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PostServiceModule,{
    transport:Transport.TCP,
    options:{
      host:'localhost',
      port:3015
    }
  });
  await app.listen();
}
bootstrap();
