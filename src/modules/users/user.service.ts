import {Injectable} from '@nestjs/common';
import {User} from './user.entity';
import {InjectRepository} from 'nestjs-mikro-orm';
import {EntityRepository} from 'mikro-orm';
import {UserDto} from '@app/modules/users/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {
  }

  async create(newUser: UserDto) {
    const user = new User({
      name: newUser.name,
      displayName: newUser.displayName,
      passwordHash: newUser.passwordHash,
    });
    await this.userRepository.persistAndFlush(user);
  }

  findOne(req: any): Promise<User> {
    const one = this.userRepository.findOne({
      ...req,
    });
    return one;
  }

}
