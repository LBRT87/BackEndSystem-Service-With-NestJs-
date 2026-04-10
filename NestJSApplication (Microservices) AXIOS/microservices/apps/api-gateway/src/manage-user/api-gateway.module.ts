import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtStrategy } from '../jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ManageContentModule } from '../manage-content/manage-content.module';
import { timeout } from 'rxjs';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ManageContentModule,
   HttpModule.register({
    timeout:5000,
    maxRedirects:5
   }),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'MAKANNASIPADANGPAKERENDANGSANGATENAK',
      signOptions:{expiresIn : '15m'}
    })
  ],
  controllers: [ApiGatewayController],
  providers: [JwtStrategy],
})
export class ApiGatewayModule {}
