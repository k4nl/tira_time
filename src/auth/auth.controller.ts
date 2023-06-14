import { Controller, Body, Post, HttpCode, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { ErrorException } from 'src/error/error.exception';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async login(@Body() loginData: UserLoginDto) {
    try {
      return this.authService.login(loginData);
    } catch (error) {
      throw new ErrorException(error);
    }
  }
}
