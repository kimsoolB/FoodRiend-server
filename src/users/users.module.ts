import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/Users.entity';
import { Friend_List } from '../entities/Friend_List.entity';
import { Write_Board } from '../entities/Write_Board.entity';
import { Bookmark } from '../entities/Bookmark.entity';
import { Hashtag } from '../entities/Hashtag.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Friend_List,
      Write_Board,
      Bookmark,
      Hashtag,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  // exports: [UsersService],
})
export class UsersModule {}
