import { EUserType } from '../enums';

export interface IAuthPermission {
  userType: EUserType;
  permission?: string;
}
