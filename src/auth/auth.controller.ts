import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Get('verify/token')
@UseGuards(AuthGuard('bearer'))
 {
  return [];
}
