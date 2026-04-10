import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [JwtModule.register({
    secret:'KATAKAKEKKUKUKUKAKIKAKEKKUKAKUKAKU',
    signOptions:{expiresIn : '15m'}
  })],
  controllers: [AuthServiceController],
  providers: [AuthServiceService,PrismaService],
})
export class AuthServiceModule {}
