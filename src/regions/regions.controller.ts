import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import {ROLES} from 'src/auth/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { ApiResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorators/api.decorators';

@ApiTags('Regions')
@ApiAuth()
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @ApiOperation({ 
    summary: 'Create new region',
    description: 'Create a new geographical region for store management'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Region created successfully' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid input data' 
  })
  @Auth()
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @ApiOperation({ 
    summary: 'Get all regions',
    description: 'Retrieve list of all geographical regions'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of regions retrieved successfully' 
  })
  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.regionsService.findAll();
  }
  
  @ApiOperation({ 
    summary: 'Get region by ID',
    description: 'Retrieve a specific region by ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Region ID',
    example: '1'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Region found' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Region not found' 
  })
  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @ApiOperation({ 
    summary: 'Update region',
    description: 'Update region information by ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Region ID',
    example: '1'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Region updated successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Region not found' 
  })
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @ApiOperation({ 
    summary: 'Delete region',
    description: 'Remove a region from the system'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Region ID',
    example: '1'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Region deleted successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Region not found' 
  })
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
