import { Module } from '@nestjs/common';
import { ManageContentController } from './manage-content.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt.strategy';

@Module({
  imports: [ClientsModule.register([
    {
      name:'POST_SERVICE',
      transport:Transport.TCP,
      options:{
        host:'localhost',
        port:3015
      }
      }
  ]),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'MAKANNASIPADANGPAKERENDANGSANGATENAK',
      signOptions:{expiresIn : '15m'}
    })
],
controllers: [ManageContentController],
providers:[JwtStrategy]
})

export class ManageContentModule { 
}