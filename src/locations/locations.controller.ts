import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import {ROLES} from 'src/auth/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { ApiResponse, ApiTags, ApiProperty } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorators/api.decorators';

@ApiAuth()
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Auth(ROLES.ADMIN)
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Auth(ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE)
  @Get()
  findAll() {
    return this.locationsService.findAll();
  }
  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @Auth(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @Auth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
