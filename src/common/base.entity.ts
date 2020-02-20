import {ObjectID} from 'mongo';
import {DeepPartial, ID} from '../common/shared-types';
import {MongoEntity, PrimaryKey, Property, SerializedPrimaryKey} from 'mikro-orm';
/**
 * @description
 * 所有 entities 继承此类
 * @docsCategory entities
 */
export abstract class BaseEntity implements MongoEntity<BaseEntity> {
  // protected constructor(input?: DeepPartial<BaseEntity>) {
  //   if (input) {
  //     for (const [ key, value ] of Object.entries(input)) {
  //       (this as any)[key] = value;
  //     }
  //   }
  // }
  @PrimaryKey()
  _id!: ObjectID;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date;

  @Property({ version: true, default: 1 })
  version!: number;
}
