import {Body, Controller, Get, Post} from '@nestjs/common';
import {InjectRepository} from 'nestjs-mikro-orm';
import {User} from '@app/modules/users/user.entity';
import {EntityRepository} from 'mikro-orm';
import {ancestorWhere} from 'tslint';
import {Allow} from '@app/decorators/allow.decorator';
import {Permission} from '@app/common/generated-types';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {
  }

  @Get()
  @Allow(Permission.Authenticated, Permission.Owner)
  async find() {
    return await this.userRepository.findAll();
  }
}
