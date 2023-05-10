import { UseGuards, applyDecorators } from '@nestjs/common';
import { Valid_Roles } from '../interfaces';
import { RoleProtected } from './role-proteted.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(...roles: Valid_Roles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
