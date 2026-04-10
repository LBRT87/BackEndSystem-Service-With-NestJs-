import { Controller, createParamDecorator, Get } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { getUserByID } from './dto/idDto.dto';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @MessagePattern({cmd:'GETUSERS'})
  getUsers() {
    return this.userServiceService.getUsers()
  }

  @MessagePattern({cmd:'GETUSERBYID'})
  getUserById (id:getUserByID) {
    return this.userServiceService.getUserByID(id)
  }
}
