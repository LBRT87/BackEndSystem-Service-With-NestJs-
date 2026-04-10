import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { RegistrationUserDTO } from './dto/registrationUser.dto';
import { LoginUserDTO } from './dto/loginUser.dto';

@Controller('auth')
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @Post('registrasi')
  registrasi(@Body() dto:RegistrationUserDTO) {
    return this.authServiceService.registration(dto)
  }

  @Post('login')
  async login (@Body() dto:LoginUserDTO) {
    return this.authServiceService.Login(dto)
  }

}
