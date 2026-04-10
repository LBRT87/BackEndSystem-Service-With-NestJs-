import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/auth-service/src/prisma/prisma.service';
import { getUserByID } from './dto/idDto.dto';

@Injectable()
export class UserServiceService {

  constructor (private prisma:PrismaService) {}

  getUsers(){
    return this.prisma.user.findMany()
  }

  getUserByID (id:getUserByID){
    const user = this.prisma.user.findUnique({
      where:{Id:Number(id.id)},
      select:{
        Id:true,
        Email:true
      }
    })
    return user
  }
}
