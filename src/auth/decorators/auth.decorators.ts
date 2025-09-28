import {applyDecorators, UseGuards} from '@nestjs/common';
import {Roles} from './roles.decorators';
import {AuthGuard} from '../guards/auth.guard';
import {RolesGuard} from '../guards/roles.guard';
import { ROLES } from '../constants/roles.constants';

 export const Auth = (...roles: ROLES[]) =>{
    roles.push(ROLES.ADMIN); //Todos los endpoints protegidos por este decorador seran accesibles por Admins);
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard, RolesGuard)
    )
}