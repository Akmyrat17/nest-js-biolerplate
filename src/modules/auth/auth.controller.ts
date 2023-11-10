import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserRegisterDto } from './dtos/user-register.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: UserLoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerUserDto: UserRegisterDto) {
    return await this.authService.register(registerUserDto);
  }
}
