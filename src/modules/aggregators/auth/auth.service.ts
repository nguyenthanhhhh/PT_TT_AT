import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { LoginData } from '../../resource/user/dto/login.dto';
import { UserService } from '../../resource/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../resource/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService implements OnModuleInit {
  private secretJWT: string;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    this.secretJWT = this.configService.get('JWT_SECRET');
  }

  async login(loginData: LoginData) {
    return this.userService.login(loginData);
  }

  async authenticate(accessToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.secretJWT,
      });

      const user = await this.userRepository.findOne({
        where: {
          username: payload.username,
        },
      });

      if (!user)
        throw new HttpException(
          '[AuthService]: User not found!',
          HttpStatus.UNAUTHORIZED,
        );

      return user;
    } catch (error) {
      throw new HttpException(
        `[AuthService] err : ${error}`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
