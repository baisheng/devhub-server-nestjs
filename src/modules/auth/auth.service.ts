/**
 * Auth service.
 * @file 权限与管理员模块服务
 * @module module/auth/service
 */
import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import crypto from 'crypto';
import ms from 'ms';

import * as APP_CONFIG from '../../app.config';
import {HttpUnauthorizedError} from '@app/common/errors/unauthorized.error';
import {ID} from '@app/common/shared-types';
import {ITokenResult} from '@app/common/types/common-types';
import {User} from '@app/modules/users/user.entity';
import {PasswordCiper} from '@app/common/helpers/password-cipher/password-ciper';
import {EventBus} from '@app/modules/event-bus/event-bus';

import {AttemptedLoginEvent} from '../event-bus/events/AttemptedLoginEvent';
// import {LoginEvent} from '../event-bus/events/login-event';
// import {LogoutEvent} from '../event-bus/events/logout-event';
import {ConfigService} from '@app/modules/config/config.service';
import {EntityManager} from 'mikro-orm';

import * as got from 'got';

@Injectable()
export class AuthService {
  private readonly sessionDurationInMs: number;

  constructor(
    // @InjectConnection() private connection: Connection,
    private readonly connection: EntityManager,
    private configService: ConfigService,
    private passwordCipher: PasswordCiper,
    private readonly jwtService: JwtService,
    private eventBus: EventBus,
  ) {
    this.sessionDurationInMs = ms(this.configService.authOptions.sessionDuration as string);
  }

  // 验证 Auth 数据
  async validateAuthData(payload: any): Promise<any> {
    // const isVerified = lodash.isEqual(payload.data, APP_CONFIG.AUTH.data);
    // IF 是微信，返回唯一标识，一般为用户的 openid
    // IF Member 成员，会处理权限等，暂时未处理
    // if (payload.type === 'wechat' || payload.type === 'member') {
    // console.log(payload);
    const user = await this.connection.getRepository(User).findOne({
      identifier: payload.identifier,
    });
    if (user) {
      return payload;
    }
    // IF 是注册会员
    // WIP
  }

  /**
   * Authenticates a user's credentials and if okay, creates a new session.
   * 验证用户的凭据，如果正确，则创建一个新会话。
   */
  async authenticate(
    identifier: string,
    password: string,
  ): Promise<ITokenResult> {
    // 触发登录事件
    this.eventBus.publish(new AttemptedLoginEvent(identifier));
    const user = await this.findUserByIdentifier(identifier);
    await this.verifyUserPassword(user._id, password);
    const token = this.jwtService.sign({
      identifier,
      id: user._id,
    });
    return Promise.resolve({
      token,
      expiresIn: APP_CONFIG.AUTH.expiresIn as number,
    });
  }

  /**
   * 根据给定用户的密码验证所提供的密码
   * @param userId
   * @param password
   */
  async verifyUserPassword(userId: ID, password: string): Promise<boolean> {
    const user = await this.connection.findOne(User, {
      _id: userId,
    }) as User;

    if (!user) {
      throw new HttpUnauthorizedError();
    }
    // const pwd = await this.passwordCipher.hash('abcd1234');
    // console.log(pwd);
    const passwordMathces = await this.passwordCipher.check(password, user.passwordHash ? user.passwordHash : '');
    if (!passwordMathces) {
      throw new HttpUnauthorizedError();
    }
    return true;
  }

  /**
   * Generates a random session token.
   */
  private generateSessionToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(32, (err, buf) => {
        if (err) {
          reject(err);
        }
        resolve(buf.toString('hex'));
      });
    });
  }

  /**
   * 根据用户唯一标识查找用户
   * @param identifier
   */
  async findUserByIdentifier(name: string): Promise<User> {
    const user = await this.connection.findOne(User, {
      name,
    });
    console.log(user);
    // TODO: 处理 metas 并查询 _capabilities 以换取权限列表
    if (!user) {
      throw new HttpUnauthorizedError();
    }
    return user;
  }
}
