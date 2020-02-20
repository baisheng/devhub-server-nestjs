import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {OrmModule} from '@app/modules/orm/orm.module';
import {UserService} from '@app/modules/users/user.service';

@Module({
  imports: [ OrmModule ],
  controllers: [ UserController ],
  providers: [ UserService ],
  exports: [ UserService ],
})
export class UserModule {
}
