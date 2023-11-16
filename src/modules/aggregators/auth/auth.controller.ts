import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../resource/user/user.service';
import { LoginData } from '../../resource/user/dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiCreatedResponse({
    description: 'Login success',
    type: LoginData,
  })
  @ApiBody({
    type: LoginData,
    examples: {
      example1: {
        value: {
          username: 'admin',
          password: '123A@a',
        },
      },
    },
  })
  async login(@Body() loginData: LoginData) {
    return this.userService.login(loginData);
  }
}
