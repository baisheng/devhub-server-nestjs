import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';

import {config} from '@app/mikro-orm.config';
// coreEntities
import {User} from '../users/user.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature({
      entities: [User],
    }),
  ],
  exports: [ MikroOrmModule ],
})
export class OrmModule {
}
