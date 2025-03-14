import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '../../user/dto/login.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import * as crypto from 'crypto'; // Importa o módulo nativo do Node.js

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async login(loginDto: LoginUserDto): Promise<User | null> {
    const { login, password } = loginDto; // Extrai login e senha
    console.log("login:", login);
  
    const user = await this.userModel.findOne({ login }).exec(); // Busca o usuário
    console.log("usuario:", user);
  
    if (!user) {
      return null; // Retorna null se não encontrar o usuário
    }
  
    // Hash da senha fornecida no login
    const hashpsw = this.hashPassword(password).trim();
  
    // Comparação direta dos hashes (também aplicando trim nos valores)
    console.log("Hash gerado:", hashpsw);
    console.log("Hash do banco:", user.password.trim());  // Use trim no hash armazenado
  
    if (hashpsw !== user.password.trim()) {
      return null; // Retorna null se a senha estiver errada
    }
  
    return user; // Retorna o usuário se estiver tudo certo
  }
  

  hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex'); // Gera um hash fixo
  }
}
