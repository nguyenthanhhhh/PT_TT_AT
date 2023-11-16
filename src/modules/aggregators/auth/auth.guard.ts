import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      let token = request.header('Authorization');

      token = token.split(' ')[1] ?? null;

      if (!token)
        throw new HttpException(
          '[Authen]: Missing token',
          HttpStatus.UNAUTHORIZED,
        );

      request['user'] = await this.authService.authenticate(token);
    } catch (error) {
      throw new HttpException('Unauthorize', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
