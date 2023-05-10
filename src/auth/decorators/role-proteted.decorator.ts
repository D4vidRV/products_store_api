import { SetMetadata } from '@nestjs/common';
import { Valid_Roles } from '../interfaces';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: Valid_Roles[]) => {
  return SetMetadata(META_ROLES, args);
};
