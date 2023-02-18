import { getRepository, Repository } from 'typeorm'

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos'
import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const userWithGames = (await this.repository.findOneOrFail({
      where: {
        id: user_id,
      },
      relations: ['games'],
    })) as User

    return userWithGames
    // Complete usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query('SELECT * FROM users order by first_name ASC') // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(
      `SELECT * FROM users where LOWER(first_name)='${first_name.toLocaleLowerCase()}' and LOWER(last_name)='${last_name.toLocaleLowerCase()}'`,
    ) // Complete usando raw query
  }
}
