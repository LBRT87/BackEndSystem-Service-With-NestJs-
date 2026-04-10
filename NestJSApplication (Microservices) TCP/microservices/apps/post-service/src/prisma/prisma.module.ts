import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '../generated/prisma/client';

@Module({
  providers: [PrismaService],
  exports:[PrismaService]
})
export class PrismaModule {}
