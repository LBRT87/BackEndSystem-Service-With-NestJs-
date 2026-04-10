import { Body, Controller, Delete, Get, Inject, Patch, Post, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegistDTO } from '../dto/regist.dto';
import { LoginDTO } from '../dto/login.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { idDTO } from '../dto/getUserbyId.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Manage USER')
@Controller('manageUser')
export class ApiGatewayController {
  constructor(
    @Inject('AUTH_SERVICE') private authClient:ClientProxy,
    @Inject('USER_SERVICE') private userClient:ClientProxy
    
  ) {}

  @Post('auth/registrasi')
  regist(@Body() dto:RegistDTO){
    return this.authClient.send({cmd:'REGISTRASI'},dto)
  }

  @Post('auth/login')
  login(@Body() dto:LoginDTO){
    return this.authClient.send({cmd:'LOGIN'},dto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('get/allusers')
  getAllUsers() {
    return this.userClient.send({cmd:'GETUSERS'},0)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('get/userbyid')
  getUserById(@Query() id:idDTO) {
    return this.userClient.send({cmd:'GETUSERBYID'},id)
  }


}
