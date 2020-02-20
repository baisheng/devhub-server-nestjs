import {Logger} from '@nestjs/common';
import {Options} from 'mikro-orm';
// import { coreEntitiesMap } from './entities';
import {User} from './modules/users/user.entity';
// const coreEntities = Object.values(coreEntitiesMap) as Array<any>;
const logger = new Logger('MikroORM');

const config = {
  entities: [ User ],
  entitiesDirsTs: [ 'src' ],
  dbName: 'dev-hub',
  clientUrl: 'mongodb://mongodb:27017',
  host: 'mongodb',
  port: 27017,
  type: 'mongo',
  debug: true,
  logger: logger.log.bind(logger),
} as Options;

export {config};
