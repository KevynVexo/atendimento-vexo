import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LoginUserDto } from '../dto/login.user.dto';
import {UsersService} from '../service/user.service';


@Controller('user') // Define a rota base /users
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() login: LoginUserDto) {
    return this.usersService.login(login);
  }

}