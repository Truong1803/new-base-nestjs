import { SetMetadata } from '@nestjs/common';

import { SPEC_KEY } from '../../constants';
import { IAuthPermission } from '../../interfaces';

export const Auth = (specs: IAuthPermission[]) => SetMetadata(SPEC_KEY, specs);
