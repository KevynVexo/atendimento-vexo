import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/user/users.module';
import {UsersController} from './modules/user/controller/login.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Cluster10298:bFNBeUZUX1p8@cluster10298.pr4ct.mongodb.net/'), // Altere para sua URL
    UsersModule,
  ],
  controllers: [AppController,UsersController],
  providers: [AppService],
})

export class AppModule {}
