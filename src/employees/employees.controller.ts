import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorators/api.decorators';
import { AwsService } from 'src/aws/aws.service';

@ApiTags('Employees')
@ApiAuth()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService, private readonly awsService: AwsService) { }

  @ApiOperation({
    summary: 'Create new employee',
    description: 'Register a new employee in the system (Admin/Manager only)'
  })
  @ApiResponse({
    status: 201,
    description: 'Employee created successfully',
    example: {
      employeeId: "123e4567-e89b-12d3-a456-426614174000",
      employeeName: "María Elena",
      employeeLastName: "González Martínez",
      employeePhoneNumber: "5559876543",
      employeeEmail: "maria.gonzalez@oxxo.com",
      location: {
        address: "Av. Juárez 123, Col. Centro", city: "CDMX", state: "Ciudad de México", zipCode: "06000"
      }
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Missing or invalid JWT token'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Insufficient permissions'
  })
  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @ApiOperation({
    summary: 'Get all employees',
    description: 'Retrieve list of all employees (Admin/Manager only)'
  })
  @ApiResponse({
    status: 200,
    description: 'List of employees retrieved successfully'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Insufficient permissions'
  })
  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @ApiOperation({
    summary: 'Get employee by ID',
    description: 'Retrieve a specific employee by UUID'
  })
  @ApiParam({
    name: 'id',
    description: 'Employee UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({
    status: 200,
    description: 'Employee found'
  })
  @ApiResponse({
    status: 404,
    description: 'Employee not found'
  })
  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Get employees by location',
    description: 'Retrieve all employees from a specific location'
  })
  @ApiParam({
    name: 'id',
    description: 'Location ID',
    example: '1'
  })
  @ApiResponse({
    status: 200,
    description: 'Employees from location retrieved'
  })
  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Get('locations/:id')
  findAllLocations(@Param('id') id: string) {
    return this.employeesService.findByLocation(+id);
  }

  @ApiOperation({
    summary: 'Update employee',
    description: 'Update employee information by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Employee UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({
    status: 200,
    description: 'Employee updated successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'Employee not found'
  })
  @Auth(ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @ApiOperation({
    summary: 'Upload employee photo',
    description: 'Upload a photo file for an employee'
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Photo uploaded successfully',
    example: 'OK'
  })
  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', { dest: './src/employees/employees-photos' }))
  async uploadPhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const response = await this.awsService.uploadFile(file);
    return this.employeesService.update(id, {employeePhoto : response.url})
  }

  @ApiOperation({
    summary: 'Delete employee',
    description: 'Remove an employee from the system (Admin/Manager only)'
  })
  @ApiParam({
    name: 'id',
    description: 'Employee UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({
    status: 200,
    description: 'Employee deleted successfully'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Insufficient permissions'
  })
  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.remove(id);
  }
}
