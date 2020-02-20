<h1 align="center">基于 NestJs 架构的连接创作者与粉丝的会员制平台</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## ❯ 为什么
项目参考一些平台社区，产品规划正在完善中

- [面包多](https://mianbaoduo.com/)
- [冲鸭](https://www.chongya.com/)
- [爱发电](https://afdian.net/)
- ……

### 产品特色

- **作品展示** 
- **创作** 单品、合集
- **成员管理** 主播、系统成员、用户管理等
- **统计分析** 节目统计、行为统计
- **小程序端** 小程序的配置、信息管理等


### 技术特色

- **简单的 API 测试** 我们引入了 e2e 测试工具.
- **D** done with the nice framework from [TypeDI](https://github.com/pleerock/typedi).
- **便捷的数据查询** 使用 ORM 框架 [MikroORM](https://mikro-orm.io/).
- **整洁的代码架构** 基于 [Nestjs](https://https://nestjs.com) 的分层设计，分为 controllers, services, repositories, models, middlewares...
- **API 文档** 采用 [swagger](http://swagger.io/).
- **API 监控** 采用 [express-status-monitor](https://github.com/RafalWilinski/express-status-monitor).
- **集成测试** 采用 [Jest](https://facebook.github.io/jest).
- **E2E API 测试** 采用 [supertest](https://github.com/visionmedia/supertest).
- **基本的安全特性** 采用 [Helmet](https://helmetjs.github.io/).
- **简单的事件调度** 采用 [event-dispatch](https://github.com/pleerock/event-dispatch).
- **快速数据库建设** 通过 [MikroORM](https://github.com/mikro-orm/mikro-orm) 简单的迁移.
- **GraphQL 支持** [GraphQL](http://graphql.org/).

## ❯ API Routes

路由的默认前缀为 `/api`

服务测试地址 [http://devhub.picker.cc/](http://devhub.picker.cc/)

| 路由            | 描述         |
| -------------- | ----------- |
| **/api**       | 显示包的名称、描述和版本 |
| **/graphql**   | 路由到graphql编辑器 query/mutations 请求 |
| **/swagger**   | 使用 Swagger UI 的 API 文档 |
| **/monitor**   | 一个简单的服务监控页面 |

> 路由访问示例: [http://devhub.picker.cc/swagger/auth/](http://devhub.picker.cc/swagger/auth/)

## 项目进展
- [ ] 待整理
- [ ] 待整理

## 其他相关项目：
- 用户 web 端
- 系统管理端
- 小程序端

## 本项目安装

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## ❯ 项目部署
> 测试环境中可以使用项目中的 docker 文件部署,
> 由于我们大部分的环境是基于 traefik + docker 服务
> 因此可以根据自身需求，修改 docker-compose 中的 treafik 配置

关于 treafik 相关的内容可以参考下面的资源
- [https://traefik.io/](https://traefik.io/)
- [基于 traefik v2 的本地开发、部署一致环境方案](https://www.jianshu.com/p/7ff09090e477)

```shell
docker-compose up -d
```

## 联系

- Author -
- Website - 
