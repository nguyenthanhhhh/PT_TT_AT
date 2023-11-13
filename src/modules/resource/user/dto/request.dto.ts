import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../../../common/decorator/auth.decorator';

export class RegisterAdminData {
  @ApiProperty({ type: String, required: true })
  @MinLength(4)
  @MaxLength(20)
  @IsString()
  username: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', { message: 'passwordConfirm not match' })
  passwordConfirm: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  lastName: string;
}

export class ChangePasswordData {
  @ApiProperty({ type: String, required: true })
  @IsString()
  oldPassword: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  newPassword: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', { message: 'PasswordConfirm not match' })
  passwordConfirm: string;
}
