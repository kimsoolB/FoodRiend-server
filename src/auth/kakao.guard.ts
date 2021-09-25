import { Injectable, AuthGuard } from '@nestjs/common';
//AuthGuard는 왜 import가 안될까요?
@Injectable()
export class kakaoAuthGuard extends AuthGuard('kakao') {}
