import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserServiceModule,{
    transport:Transport.TCP,
    options:{
      host:'localhost',
      port:3010
    }
  });

  await app.listen();
}
bootstrap();


