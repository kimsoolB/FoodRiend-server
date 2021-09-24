import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, PatchUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '../entities/Users.entity';
import { Friend_List } from '../entities/Friend_List.entity';
import { Write_Board } from '../entities/Write_Board.entity';
import { Bookmark } from '../entities/Bookmark.entity';
import { Hashtag } from '../entities/Hashtag.entity';
import { Upload_Image } from '../entities/Upload_Image.entity';

@Injectable()
export class UsersService {
  @InjectRepository(Users)
  private readonly usersRepository: Repository<Users>;
  @InjectRepository(Friend_List)
  private readonly friendListRepository: Repository<Friend_List>;
  @InjectRepository(Write_Board)
  private readonly writeBoardRepository: Repository<Write_Board>;
  @InjectRepository(Bookmark)
  private readonly bookmarkRepository: Repository<Bookmark>;
  @InjectRepository(Hashtag)
  private readonly hashtagRepository: Repository<Hashtag>;

  async getUserInfo(id: number) {
    const user = await this.usersRepository.findOne(
      { id: id },
      { select: ['name', 'nickname', 'profileImage', 'foodStyle', 'foodType'] },
    );

    //     const cntFriend = await this.friendListRepository.count({
    //       user_id: id,
    //     });

    //     const customUser = {
    //       ...user,
    //       cntFriend: cntFriend,
    //     };

    //     const cntAte = await this.writeBoardRepository.count({
    //       user_id: id,
    //     });

    //     const cntWant = await this.writeBoardRepository.count({
    //       user_id: id,
    //       best: true,
    //     });

    //     const cntBest = await this.bookmarkRepository.count({
    //       user_id: id,
    //     });

    //     const customCounting = {
    //       ate: cntAte,
    //       want: cntWant,
    //       best: cntBest,
    //     };

    //     const feedData = await this.writeBoardRepository
    //       .createQueryBuilder('writeBoard')
    //       .leftJoinAndSelect('writeBoard.img', 'img')
    //       .leftJoinAndSelect('writeBoard.hashtag', 'hashtag')
    //       .leftJoinAndSelect('writeBoard.joinT', 'joinT')
    //       .select([
    //         'img.foodImage',
    //         'writeBoard.id',
    //         'writeBoard.rating',
    //         'writeBoard.comments',
    //         'hashtag.tag',
    //         'joinT.title',
    //         'joinT.location',
    //       ])
    //       .where('writeBoard.user_id = :id', { id: id })
    //       .getMany();

    //     let isData = null;
    //     let customFeed;

    //     if (feedData.length === 0) {
    //       isData = false;
    //       customFeed = feedData.map((el) => {
    //         el.feedId = el.id;
    //         delete el.id;
    //         el.title = el.joinT.title;
    //         el.location = el.joinT.location;
    //         delete el.joinT;
    //         return el;
    //       });
    //     } else {
    //       isData = true;
    //     }

    //     return {
    //       data: {
    //         user: customUser,
    //         counting: customCounting,
    //         feed: customFeed,
    //       },
    //       status: 200,
    //       isData: isData,
    //     };
    //   }

    //   async update(id: number, dto: PatchUserDto) {
    //     const user = await this.usersRepository.findOne({ id: id });

    //     if (Object.keys(dto).length === 0) {
    //       return new HttpException('Does empty request', 403);
    //     }

    //     for (const reqBody in dto) {
    //       user[reqBody] = dto[reqBody];
    //     }

    //     const updateUser = await this.usersRepository.save(user);

    //     return {
    //       data: {
    //         profileImage: updateUser.profileImage,
    //         foodType: updateUser.foodType,
    //         foodStyle: updateUser.foodStyle,
    //       },
    //       status: 200,
    //     };
    //   }
  }
}
