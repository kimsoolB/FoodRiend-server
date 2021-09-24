import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { KakaoStrategy } from './kakao.strategy';

@Module({
  imports: [UsersModule, JwtModule],
  providers: [AuthService, JwtStrategy, KakaoStrategy],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
