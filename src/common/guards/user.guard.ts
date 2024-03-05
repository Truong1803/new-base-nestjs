import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_TOKEN_SECRET_KEY } from 'src/constants';

import { ErrorHelper, TokenHelper } from '../../helpers';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization || String(req.cookies.JWT);
    const userInfo = await this.verifyAccessToken(authorization);
    req.user = userInfo;

    return true;
  }

  async verifyAccessToken(authorization: string): Promise<unknown> {
    const [bearer, accessToken] = authorization.split(' ');
    if (bearer === 'Bearer' && accessToken !== '') {
      const payload = TokenHelper.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);
      return payload;
    } else {
      ErrorHelper.UnauthorizedException('Unauthorized');
    }
  }
}
