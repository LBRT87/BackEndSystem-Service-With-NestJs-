import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtStrategy } from '../jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ManageContentModule } from '../manage-content/manage-content.module';

@Module({
  imports: [
    ManageContentModule,
    ClientsModule.register([
      {
        name:'AUTH_SERVICE',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3005
        }
      }, {
        name:'USER_SERVICE',
        transport:Transport.TCP,
        options:{
          host:'localhost',
          port:3010
        }
      }
    ]),
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
