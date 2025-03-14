import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '../../user/dto/login.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users = []; // Simulando um banco de dados

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async login(loginDto: LoginUserDto): Promise<User | null> {
    const { login, password } = loginDto; // Extrai login e password do DTO
    console.log("login:"+login);
    const user = await this.userModel.findOne({ login }).exec(); // Busca pelo login
    console.log("usuario:"+user);
  
    if (!user) {
      return null; // Retorna null se não encontrar o usuário
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password); // Compara a senha
  
    if (!isPasswordValid) {
      return null; // Retorna null se a senha estiver errada
    }
  
    return user; // Retorna o usuário se estiver tudo certo
  }
  

}
