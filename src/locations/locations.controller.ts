import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import {ROLES} from 'src/auth/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { ApiResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorators/api.decorators';

@ApiTags('Locations')
@ApiAuth()
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiOperation({ 
    summary: 'Create new location',
    description: 'Create a new OXXO store location (Admin only)'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Location created successfully' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Admin access only' 
  })
  @Auth(ROLES.ADMIN)
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @ApiOperation({ 
    summary: 'Get all locations',
    description: 'Retrieve list of all OXXO store locations'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of locations retrieved successfully' 
  })
  @Auth(ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE)
  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @ApiOperation({ 
    summary: 'Get location by ID',
    description: 'Retrieve a specific location by ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Location ID',
    example: '1'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Location found' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Location not found' 
  })
  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @ApiOperation({ 
    summary: 'Update location',
    description: 'Update location information by ID (Admin only)'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Location ID',
    example: '1'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Location updated successfully' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Admin access only' 
  })
  @Auth(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @ApiOperation({ 
    summary: 'Delete location',
    description: 'Remove a location from the system (Admin only)'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Location ID',
    example: '1'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Location deleted successfully' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Admin access only' 
  })
  @Auth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
