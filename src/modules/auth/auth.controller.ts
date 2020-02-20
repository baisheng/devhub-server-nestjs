import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {HttpProcessor} from '@app/decorators/http.decorator';
import {AuthLogin} from '@app/modules/auth/dto/auth.dto';
import {UserDto} from '@app/modules/users/user.dto';
import {UserService} from '@app/modules/users/user.service';
import {PasswordCiper} from '@app/common/helpers/password-cipher/password-ciper';
import {AuthService} from '@app/modules/auth/auth.service';
import {IQueryParamsResult, QueryParams} from '@app/decorators/query-params.decorator';
import {HttpBadRequestError} from '@app/errors/bad-request.error';
import {isEmpty} from 'lodash';
import {LoginDto} from '@app/modules/auth/dto/login.dto';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('用户权限')
@Controller('auth')
export class AuthController {
  constructor(
    protected authService: AuthService,
    protected userService: UserService,
    private passwordCipher: PasswordCiper,
  ) {
  }

  /**
   * 用户注册
   */
  @ApiOperation({summary: '注册'})
  @Post('register')
  @HttpProcessor.handle({message: '用户注册', error: HttpStatus.BAD_REQUEST})
  async register(
    @QueryParams() {visitors: {ip}}: IQueryParamsResult,
    @Body() body: AuthLogin,
  ) {
    const userDTO = new UserDto();
    userDTO.name = body.name;
    userDTO.displayName = body.displayName;
    userDTO.passwordHash = await this.passwordCipher.hash(body.password);
    // 检查用户是否存在
    const hasUser = await this.userService.findOne({
      name: body.name,
    });
    if (!isEmpty(hasUser)) {
      throw new HttpBadRequestError('用户名已存在');
    }
    await this.userService.create(userDTO);

    return this.authService.authenticate(body.name, body.password)
      .then(token => {
        return token;
      });
  }

  @ApiOperation({summary: '登录'})
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.authenticate(dto.name, dto.password)
      .then(token => {
        return token;
      });
  }

  @ApiOperation({summary: '签出'})
  signout() {
  }

  // @Get('me')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // async user() {
  //   return user;
  // }
}
