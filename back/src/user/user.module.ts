import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './user.model';

@Module({
  imports:[
  TypegooseModule.forFeature([
    {
      typegooseClass:UserModel,
      schemaOptions:{
        collection: 'User',
        },
      },
  
  ]),
  ConfigModule,
],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
