import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { getMongoDbConfig } from './config/mongo.config';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { ActorModule } from './actor/actor.module';
import { MovieModule } from './movie/movie.module';
import { RatingModule } from './rating/rating.module';
import { TelegramModule } from './telegram/telegram.module';






@Module({
  imports: [
    ConfigModule.forRoot(), //Нужно для подключения бд
    TypegooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:getMongoDbConfig,
    }),
     AuthModule,
     UserModule,
     GenreModule,
     FileModule,
     ActorModule,
     MovieModule,
     RatingModule,
     TelegramModule,
     
    

  ], 
 
  controllers: [AppController],
  providers: [AppService], //Снабжает чем либо 
})
export class AppModule {}
