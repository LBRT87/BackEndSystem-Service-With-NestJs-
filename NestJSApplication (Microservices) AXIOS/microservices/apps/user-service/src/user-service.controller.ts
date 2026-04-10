import { Controller, createParamDecorator, Get, Query } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { getUserByID } from './dto/idDto.dto';
import { idDTO } from 'apps/api-gateway/src/dto/getUserbyId.dto';


@Controller('user')
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get('all')
  getUsers() {
    return this.userServiceService.getUsers()
  }

  @Get('id')
  getUserById (@Query() id:idDTO) {
    return this.userServiceService.getUserByID(id)
  }
}
