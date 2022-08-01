import {
  Body,
  Controller,
  HttpCode,
  Module,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Controller('auth')
export class AuthController {//Контроллер получает данные и отдает их в service а потом отвечает либо готовыми данными либо ошибкой
  constructor(private readonly AuthService: AuthService) {}


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login') //это путь
  async login(@Body() dto: AuthDto) {
    return this.AuthService.login(dto)
  }

  
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token') //это путь
  async getNewTokens(@Body() dto:RefreshTokenDto){
    return this.AuthService.getNewTokens(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register') //это путь
  async register(@Body() dto: AuthDto) {
    return this.AuthService.register(dto)
  }
}
