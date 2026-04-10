import { Body, Controller, Delete, Get, Inject, Patch, Post, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegistDTO } from '../dto/regist.dto';
import { LoginDTO } from '../dto/login.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { idDTO } from '../dto/getUserbyId.dto';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import { response } from 'express';

@ApiTags('Manage USER')
@Controller('manageUser')
export class ApiGatewayController {
  constructor() {}

  @Post('autentikasi-r')
  async regist(@Body() dto:RegistDTO){
    const response = await axios.post('http://localhost:3005/auth/registrasi',dto)
    return response.data
  }

  @Post('autentikasi-l')
  async login(@Body() dto:LoginDTO){
    const response = await axios.post('http://localhost:3005/auth/login',dto)
    return response.data
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('get-a')
  async getAllUsers(@Req()req) {
    const token = req.headers.authorization
    const response = await axios.get('http://localhost:3010/user/all', {
      headers:{Authorization:token}
    })
    return response.data
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('get-i')
  async getUserById(@Query() id:idDTO, @Req() req) {
    const token = req.headers.authorization
    console.log('Sampe Di Gateway GetUserById')
    console.log(id)
    const response = await axios.get('http://localhost:3010/user/id', {
      headers:{Authorization:token},
      params:id})
      return response.data
  }


}
