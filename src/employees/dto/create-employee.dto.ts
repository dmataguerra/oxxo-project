import {IsEmail, IsObject, IsString, MaxLength, IsOptional } from "class-validator";

export class CreateEmployeeDto{ 
    @IsString()
    @MaxLength(40)
    employeeName: string;
    @IsString()
    @MaxLength(40)
    employeeLastName: string;
    @IsString()
    @MaxLength(10)
    employeePhoneNumber: string;
    @IsString()
    @IsEmail()
    employeeEmail: string;
    @IsOptional()
    @IsObject()
    location : object;
}
