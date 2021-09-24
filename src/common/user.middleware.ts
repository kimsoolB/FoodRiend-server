import { NextFunction, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Join_T } from '../entities/Join_T.entity';
import { Shop_Info } from '../entities/Shop_Info.entity';
import { Users } from '../entities/Users.entity';

export async function UserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;
  const usersRepository: Repository<Users> = getRepository(Users);

  const existUser = await usersRepository.find({ id: Number(id) });
  if (existUser.length === 0) {
    return res.status(401).send('not found user');
  }
  next();
}
