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
import { ApiResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorators/api.decorators';

@ApiTags('Providers')
@ApiAuth()
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}
  
  @ApiOperation({ 
    summary: 'Create new provider',
    description: 'Create a new provider/supplier (Admin/Manager only)'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Provider created successfully' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Insufficient permissions' 
  })
  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @ApiOperation({ 
    summary: 'Get all providers',
    description: 'Retrieve list of all providers (Admin/Manager only)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of providers retrieved successfully' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Employee access denied' 
  })
  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get()
  findAll(@UserData() user: User) {
    if (user.userRoles.includes("Employee")) throw new UnauthorizedException('No estas autorizado, solo Admins y Managers.');
    return this.providersService.findAll();
  }

  @ApiOperation({ 
    summary: 'Get provider by name',
    description: 'Find provider by company name'
  })
  @ApiParam({ 
    name: 'name', 
    description: 'Provider company name',
    example: 'Coca-Cola FEMSA'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Provider found' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Provider not found' 
  })
  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get('/name/:name')
  findByName(@Param('name') name: string){
    //Implementar el servicio findOneByName
    return this.providersService.findByName(name);
  }

  @ApiOperation({ 
    summary: 'Get provider by ID',
    description: 'Retrieve a specific provider by UUID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Provider UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Provider found' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Provider not found' 
  })
  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if (!provider) throw new NotFoundException();
    return provider;
  }

  @ApiOperation({ 
    summary: 'Update provider',
    description: 'Update provider information (Admin/Manager only)'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Provider UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Provider updated successfully' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Insufficient permissions' 
  })
  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @ApiOperation({ 
    summary: 'Delete provider',
    description: 'Remove a provider from the system (Admin/Manager only)'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Provider UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Provider deleted successfully' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Insufficient permissions' 
  })
  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
