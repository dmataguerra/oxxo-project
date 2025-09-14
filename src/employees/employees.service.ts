import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { last } from 'rxjs';
import {v4 as uuid} from 'uuid';


@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[]= [
    {
    id: uuid(),
    name: 'John Doe',
    lastName: 'Smith',
    phoneNumber: '123-456-7890'
  },
  {
    id: uuid(),
    name: 'Jane',
    lastName: 'Doe',
    phoneNumber: '987-654-3210'
  }]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
   this.employees.push(createEmployeeDto);
   return this.employees; 
  }

  findAll() {
    //Retorne todos los empleados
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee)=> employee.id === id)[0];
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = this.employees.find((employee) => employee.id === id);
    if (!employee) throw new NotFoundException('Employee not found');
    Object.assign(employee, updateEmployeeDto);
    return employee;
  }

  remove(id: string) {
    this.findOne(id);
    this.employees =  this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}
