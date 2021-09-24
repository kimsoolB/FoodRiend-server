import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  authCode: string;
}

export class PatchUserDto {
  profileImage?: string;

  foodType?: string;

  foodStyle?: string;
}
