import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '../user/service/user.service';
import { UsersController } from './controller/login.controller';
import { User,UserSchema } from '../user/schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Se precisar usar esse serviço em outros módulos
})
export class UsersModule {}
