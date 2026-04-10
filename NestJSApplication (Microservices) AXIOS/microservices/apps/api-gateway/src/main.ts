import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './manage-user/api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiGatewayModule);
   const config = new DocumentBuilder() 
    .setTitle('WELCOME TO BINUS SLC 26-1')
    .setDescription('The Junior Laboratory Assistant')
    .setVersion('1.0')
    .addTag('slc')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  console.log('port 3000 jalan')
}
bootstrap();
