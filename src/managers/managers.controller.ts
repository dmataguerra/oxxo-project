import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import {ROLES} from 'src/auth/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { ApiResponse, ApiTags, ApiProperty } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorators/api.decorators';

@ApiAuth()
@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}
  
  @Auth(ROLES.ADMIN)
  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }
  
  @Auth(ROLES.ADMIN)
  @Get()
  findAll() {
    return this.managersService.findAll();
  }

  @Auth(ROLES.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managersService.findOne(id);
  }

  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @Auth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managersService.remove(id);
  }
}
