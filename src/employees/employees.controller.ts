import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {Auth} from 'src/auth/decorators/auth.decorators';
import {ROLES} from 'src/auth/constants/roles.constants';
import { ApiResponse, ApiTags, ApiProperty } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorators/api.decorators';

@ApiAuth()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @ApiResponse({
    example : {
      employeeId : "uuid",
      employeeName : "David",
      employeeLastName : "Gonzalez",
      employeePhoneNumber : "1234567890",
      employeeEmail : "dmataguerra@outlook.com",
      location : { address: "Paseo Libero", city: "Queretaro", state: "Qro", zipCode: "37900"
    }
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })
  @ApiResponse({
    status: 401,
    description: 'Missing or invalid JWT token'
  })
  @ApiResponse({
    status: 403,
    description: 'Missing role'
  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Get('locations/:id')
  findAllLocations(@Param('id') id: string) {
    return this.employeesService.findByLocation(+id);
  }

  @Auth(ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {dest: './src/employees/employees-photos'}))
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return "OK";
  }

  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.remove(id);
  }  
}
