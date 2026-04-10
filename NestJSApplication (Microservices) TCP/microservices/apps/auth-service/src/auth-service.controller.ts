import { Controller, Get } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { RegistrationUserDTO } from './dto/registrationUser.dto';
import { LoginUserDTO } from './dto/loginUser.dto';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @MessagePattern({cmd:'REGISTRASI'})
  registrasi(dto:RegistrationUserDTO) {
    return this.authServiceService.registration(dto)
  }

  @MessagePattern({cmd:'LOGIN'})
  login (dto:LoginUserDTO) {
    return this.authServiceService.Login(dto)
  }

}
