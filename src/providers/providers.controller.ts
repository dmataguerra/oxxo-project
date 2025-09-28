import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { NotFoundException } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserData } from 'src/auth/decorators/user.decorators';
import { User } from 'src/auth/entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Auth } from 'src/auth/decorators/auth.decorators';
import {ROLES} from 'src/auth/constants/roles.constants';
import { ApiResponse, ApiTags, ApiProperty } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorators/api.decorators';

@ApiAuth()
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}
  
  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get()
  findAll(@UserData() user: User) {
    if (user.userRoles.includes("Employee")) throw new UnauthorizedException('No estas autorizado, solo Admins y Managers.');
    return this.providersService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get('/name/:name')
  findByName(@Param('name') name: string){
    //Implementar el servicio findOneByName
    return this.providersService.findByName(name);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if (!provider) throw new NotFoundException();
    return provider;
  }

  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
