import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SECRET_CRONJOB } from 'src/constants';

@Injectable()
export class CronjobGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const hash = req.query.hash;
    return this.checkHashCronjob(hash);
  }

  async checkHashCronjob(hash: string) {
    if (hash === SECRET_CRONJOB) {
      return true;
    }
    return false;
  }
}
