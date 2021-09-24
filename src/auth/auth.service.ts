import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../entities/Users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(token: string): Promise<any> {
    const user = await this.usersService.findAll();
    if (!user) {
      return null;
    }
    return user;
  }

  async createToken(user: Users) {
    const data = {
      user_no: user.id,
      user_token: 'loginToken',
    };

    return this.jwtService.sign(data, {
      secret: process.env.JWT,
      expiresIn: '48H',
    });
  }

  async tokenValidate(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
