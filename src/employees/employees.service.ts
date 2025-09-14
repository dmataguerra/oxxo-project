import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { last } from 'rxjs';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[]= [
    {
    id: 1,
    name: 'John Doe',
    lastName: 'Smith',
    phoneNumber: '123-456-7890'
  },
  {
    id: 2,
    name: 'Jane',
    lastName: 'Doe',
    phoneNumber: '987-654-3210'
  }]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length + 1;
   this.employees.push(createEmployeeDto);
   return this.employees; 
  }

  findAll() {
    //Retorne todos los empleados
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee)=> employee.id === id);
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = this.employees.find((employee) => employee.id === id);
    if (!employee) {
      return null;
    }
    Object.assign(employee, updateEmployeeDto);
    return employee;
  }

  remove(id: number) {
    this.employees =  this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}
