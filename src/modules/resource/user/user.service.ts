import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { salt } from '../../../common/const/auth.const';
import { ChangePasswordData, RegisterAdminData } from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginData } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUserByUsername(username: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username,
          isDeleted: false,
        },
      });

      if (user) return user;
      return null;
    } catch (error) {
      console.log('[getUserByUsername] err: ', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async registerAdminUser(registerData: RegisterAdminData) {
    try {
      const checkExist = await this.getUserByUsername(registerData.username);
      if (checkExist)
        throw new HttpException(
          'Username is already exists!',
          HttpStatus.CONFLICT,
        );

      registerData.password = await bcrypt.hash(registerData.password, salt);

      const adminUser = this.userRepository.create({
        username: registerData.username,
        password: registerData.password,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        isAdmin: true,
      });

      await this.userRepository.save({
        ...adminUser,
        isAdmin: true,
      });

      return adminUser;
    } catch (error) {
      console.log('[registerAdminUser] err: ', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginData: LoginData) {
    try {
      const { username, password } = loginData;
      const user = await this.userRepository.findOne({
        where: {
          username,
          isDeleted: false,
        },
      });

      if (!user)
        throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword)
        throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);

      return {
        access_token: await this.jwtService.signAsync({
          username: user.username,
          isAdmin: user.isAdmin,
        }),
        isAdmin: user.isAdmin,
      };
    } catch (error) {
      console.log('[login] err: ', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changePasswordUser(userId: number, changePassData: ChangePasswordData) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
          isAdmin: false,
        },
      });

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const comparePassword = await bcrypt.compare(
        changePassData.oldPassword,
        user.password,
      );

      if (!comparePassword)
        throw new HttpException(
          'Old Password not match',
          HttpStatus.BAD_REQUEST,
        );

      changePassData.newPassword = await bcrypt.hash(
        changePassData.newPassword,
        salt,
      );

      await this.userRepository.update(user.id, {
        password: changePassData.newPassword,
      });

      return true;
    } catch (error) {
      console.log('[changePasswordUser] err: ', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changePasswordAdmin(
    adminId: number,
    changePassData: ChangePasswordData,
  ) {
    try {
      const admin = await this.userRepository.findOne({
        where: {
          id: adminId,
          isAdmin: true,
        },
      });

      if (!admin)
        throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);

      const comparePassword = await bcrypt.compare(
        changePassData.oldPassword,
        admin.password,
      );

      if (!comparePassword)
        throw new HttpException(
          'Old Password not match',
          HttpStatus.BAD_REQUEST,
        );

      changePassData.newPassword = await bcrypt.hash(
        changePassData.newPassword,
        salt,
      );

      await this.userRepository.update(admin.id, {
        password: changePassData.newPassword,
      });

      return true;
    } catch (error) {
      console.log('[changePasswordAdmin] err: ', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
