import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LoginUserDto } from '../dto/login.user.dto';
import {UsersService} from '../service/user.service';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('user') // Define a rota base /users
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() login: LoginUserDto, @Res() res: Response) {
    const result = await this.usersService.login(login);
    console.log("controller:"+result);
    if (result == null) {
      return res.status(401).json({ message: "Login ou Senha incorretos" });
    }

    return res.status(200).json({ success: true, data: result });
  }



}