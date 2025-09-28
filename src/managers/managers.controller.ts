import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import {ROLES} from 'src/auth/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { ApiResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorators/api.decorators';

@ApiTags('Managers')
@ApiAuth()
@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}
  
  @ApiOperation({ 
    summary: 'Create new manager',
    description: 'Register a new manager in the system (Admin only)'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Manager created successfully' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Admin access only' 
  })
  @Auth(ROLES.ADMIN)
  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }
  
  @ApiOperation({ 
    summary: 'Get all managers',
    description: 'Retrieve list of all managers (Admin only)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of managers retrieved successfully' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Admin access only' 
  })
  @Auth(ROLES.ADMIN)
  @Get()
  findAll() {
    return this.managersService.findAll();
  }

  @ApiOperation({ 
    summary: 'Get manager by ID',
    description: 'Retrieve a specific manager by UUID (Admin only)'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Manager UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Manager found' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Manager not found' 
  })
  @Auth(ROLES.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managersService.findOne(id);
  }

  @ApiOperation({ 
    summary: 'Update manager',
    description: 'Update manager information by ID (Admin/Manager)'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Manager UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Manager updated successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Manager not found' 
  })
  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @ApiOperation({ 
    summary: 'Delete manager',
    description: 'Remove a manager from the system (Admin only)'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Manager UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Manager deleted successfully' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Admin access only' 
  })
  @Auth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managersService.remove(id);
  }
}
