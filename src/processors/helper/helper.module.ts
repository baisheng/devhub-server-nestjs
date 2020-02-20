/**
 * Helper module.
 * @file Helper 全局模块
 * @module processor/helper/module
 */

import { Module, Global, HttpModule } from '@nestjs/common';
import { EmailService } from './helper.service.email';
import {PasswordCiper} from '@app/common/helpers/password-cipher/password-ciper';

const services = [ EmailService, PasswordCiper];
@Global()
@Module({
  imports: [HttpModule],
  providers: services,
  exports: services,
})
export class HelperModule {}
