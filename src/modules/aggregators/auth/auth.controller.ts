import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../resource/user/user.service';
import { LoginData } from '../../resource/user/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginData: LoginData) {
    return this.userService.login(loginData);
  }
}
