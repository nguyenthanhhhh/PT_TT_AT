import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../../../common/decorator/auth.decorator';

export class RegisterAdminData {
  @MinLength(4)
  @MaxLength(20)
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', { message: 'passwordConfirm not match' })
  passwordConfirm: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class ChangePasswordData {
  @IsString()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', { message: 'PasswordConfirm not match' })
  passwordConfirm: string;
}
