import * as jwt from 'jsonwebtoken';
import { AUTH_MESSAGE } from 'src/constants';
import { ITokenGenerate } from 'src/interfaces';

import { ErrorHelper } from './index';

export class TokenHelper {
  static generate(
    payload: Record<string, any>,
    secret: string,
    expiresIn: string,
  ): ITokenGenerate {
    const token = jwt.sign(payload, secret, {
      expiresIn,
    });
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    return {
      token,
      expires: decoded.iat,
    };
  }

  static verify<T>(token: string, secret: string, opts?: jwt.VerifyOptions): T {
    try {
      const options: jwt.VerifyOptions = {
        ...opts,
        algorithms: ['HS256'],
      };
      const payload = jwt.verify(token, secret, options);
      return payload as any;
    } catch (error) {
      if (error.name === 'TokenExpiredError')
        ErrorHelper.UnauthorizedException(AUTH_MESSAGE.TOKEN_EXPIRED);
      if (error.name === 'JsonWebTokenError')
        ErrorHelper.UnauthorizedException(AUTH_MESSAGE.TOKEN_INVALID);
      throw error;
    }
  }
}
