import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../dist/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { authorization } = request.headers;
    if (authorization === undefined) {
      throw new HttpException('Token 전송 안됨', HttpStatus.UNAUTHORIZED);
    }

    //토큰 만료 시간을 계산해서 남은 시간이 5분 미만일 경우 401을 띄우려고 했습니다. 
    //근데 지금보니 그냥,, 만료된 이후에 boolean값만 체크하면 되지 않았을까 싶네요..
    const token = authorization.replace('Bearer ', '');
    const tokenValidate = await this.validate(token);
    if (tokenValidate.tokenReissue) {
      response.setHeader('access_token', tokenValidate.new_token);
      response.setHeader('tokenReissue', true);
    } else {
      response.setHeader('tokenReissue', false);
    }
    request.user = tokenValidate.user ? tokenValidate.user : tokenValidate;
    return true;
  }

  async validate(token: string) {
    try {
      const token_verify = await this.authService.tokenValidate(token);
      const tokenExp = new Date(token_verify['exp'] * 1000);
      const current_time = new Date();
      const time_remaining = Math.floor(
        (tokenExp.getTime() - current_time.getTime()) / 1000 / 60,
      );

      if (token_verify.user_token === 'loginToken') {
        if (time_remaining < 5) {
          const access_token_user = await this.userService;
          return {
            tokenReissue: true,
          };
        } else {
          const user = await this.userService;
          return {
            user,
            tokenReissue: false,
          };
        }
      } else {
        return token_verify;
      }
    } catch (error) {
      switch (error.message) {
        case 'invalid token':
          throw new HttpException('유효하지 않은 토큰입니다.', 401);
      }
    }
  }
}
