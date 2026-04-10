import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistrationUserDTO } from './dto/registrationUser.dto';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { LoginUserDTO } from './dto/loginUser.dto';

@Injectable()
export class AuthServiceService {
  constructor (
    private prisma:PrismaService,
    private jwtService:JwtService
  ){}

  async generateToken (user:any) {
    const payload = {
      id:user.id,
      email:user.email
    }

    const [refresh,access] = await Promise.all([
      this.jwtService.signAsync({payload},{secret:'SAYASEDANGNNYANTAIDIJEPANGSAMBILNGODING', expiresIn:'7d'}),
      this.jwtService.signAsync({payload},{secret:'MAKANNASIPADANGPAKERENDANGSANGATENAK',expiresIn:'15m'})
    ])

    return {access_token:access,refresh_token:refresh}
  }

  async registration (dto:RegistrationUserDTO) {
    const exist = await this.prisma.user.findFirst({
      where: {Email: dto.email}
    })

    if (exist){
      return {message: 'Email already registered'}
    }

    const hashedPassword = await bcrypt.hash (dto.password,10) 
    const newUser = await this.prisma.user.create({
      data:{
        Email:dto.email,
        Password:hashedPassword
      }
    })

    const payload = {
      id:newUser.Id,
      email:newUser.Email
    }

    return {message: 'Registration Succeed' }
  }

  async Login (dto:LoginUserDTO) {
    const existEmail = await this.prisma.user.findFirst({
      where:{Email:dto.email}
    })
    if (!existEmail) {
      return {message: 'Email Not Found'}
    }

    const checkPassword = await bcrypt.compare(dto.password,existEmail.Password)

    if (!checkPassword) {
      return {message: 'Password Not Match !'}
    }

    const payload = {
      id:existEmail.Id,
      email:existEmail.Email
    }
    const token = await this.generateToken(payload)
    const hashRT = await bcrypt.hash(token.refresh_token,10)
    const assignRT = await this.prisma.user.update({
      where:{Id:existEmail.Id},
      data:{
        RefreshToken:hashRT
      }
    })

    if (existEmail && checkPassword) {
      return {message:'Login Succees', access_token:token.access_token, refresh_token : token.refresh_token}
    }
  }


}
