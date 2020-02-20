import {MiddlewareConsumer, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
// 中间件
import {CorsMiddleware} from '@app/middlewares/cors.middleware';
import {OriginMiddleware} from '@app/middlewares/origin.middleware';
// 公用模块
import {OrmModule} from './modules/orm/orm.module';
// 业务模块
import {UserModule} from './modules/users/user.module';
import {APP_GUARD} from '@nestjs/core';
import {JwtAuthGuard} from '@app/guards/auth.guard';
import {HelperModule} from '@app/processors/helper/helper.module';
import {EventBusModule} from '@app/modules/event-bus/event-bus.module';
import {ConfigModule} from '@app/modules/config/config.module';
import {CacheModule} from '@app/processors/cache/cache.module';
import {AuthModule} from '@app/modules/auth/auth.module';

@Module({
  controllers: [ AppController ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    HelperModule,
    EventBusModule,
    ConfigModule,
    // CacheModule,
    OrmModule,
    // 权限模块
    UserModule,
    AuthModule,
    // 用户模块
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes('*');
  }
}
