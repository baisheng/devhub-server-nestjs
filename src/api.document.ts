// 内部系统对接 API
import * as APP_CONFIG from '@app/app.config';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {UserModule} from '@app/modules/users/user.module';
import {INestApplication, Injectable} from '@nestjs/common';
import {AuthModule} from '@app/modules/auth/auth.module';

@Injectable()
export class ApiDocument {
  private readonly app: INestApplication;

  constructor(app) {
    this.app = app;
  }

  public build() {
    // this.createInternalDoc();
    this.createAuthDoc();
    // this.createUsersDoc();
  }

  private createDocument(apiPath, config, modules: any[]) {
    const document = SwaggerModule.createDocument(this.app, config, {
      include: modules,
    });
    SwaggerModule.setup(apiPath, this.app, document);
  }

  /**
   * 创建权限 API 文档
   */
  private createAuthDoc() {
    const options = new DocumentBuilder()
      .setTitle('Devhub API')
      .setDescription('Devhub 权限 API')
      .setVersion(APP_CONFIG.INFO.version)
      .addTag('权限')
      .build();
    this.createDocument('swagger/auth', options, [AuthModule]);
  }

  private createUsersDoc() {
    const options = new DocumentBuilder()
      .setTitle('Devhub API')
      .setDescription('Devhub 用户 API')
      .setVersion(APP_CONFIG.INFO.version)
      .addTag('用户')
      .addBearerAuth()
      .build();
    this.createDocument('swagger/user', options, [ UserModule ]);
  }
}
