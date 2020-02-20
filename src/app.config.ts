/**
 * App config.
 * @file 应用运行配置
 * @module app/config
 */

import * as path from 'path';
import { argv } from 'yargs';
import { packageJson } from '@app/transforms/module.transform';

export const APP = {
  LIMIT: 16,
  PORT: 80,
  ROOT_PATH: __dirname,
  NAME: 'Devhub',
  URL: 'https://devhub.picker.cc',
  FRONT_END_PATH: path.join(__dirname, '..', '..', 'devhub.picker.cc'),
};

export const CROSS_DOMAIN = {
  allowedOrigins: ['https://picker.cc', 'https://cdn.picker.cc', 'https://admin.picker.cc'],
  allowedReferer: 'picker.cc',
};

export const REDIS = {
  host: argv.redis_host || 'redis',
  port: argv.redis_port || 6379,
  ttl: null,
  defaultCacheTTL: 60 * 60 * 24,
};

export const AUTH = {
  expiresIn: argv.auth_expires_in || 3600,
  data: argv.auth_data || { user: 'root' },
  // jwtTokenSecret: argv.auth_key || 'devhub',
  jwtTokenSecret: argv.auth_key || 'devhub',
  defaultPassword: argv.auth_default_password || 'root',
};

export const EMAIL = {
  account: argv.email_account || 'your email address like : i@picker.cc',
  password: argv.email_password || 'your email password',
  from: '"Baisheng" <i@baisheng.me>',
  admin: 'admin@admin.com',
};

export const ALIYUN = {
  ip: argv.aliyun_ip_auth,
};

export const INFO = {
  name: packageJson.name,
  version: packageJson.version,
  author: packageJson.author,
  site: APP.URL,
  homepage: packageJson.homepage,
  powered: ['Vue', 'nestjs', 'Nodejs', 'Graphql', 'MySQL', 'Express', 'Nginx'],
};
