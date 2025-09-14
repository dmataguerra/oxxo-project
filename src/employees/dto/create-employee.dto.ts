import {IsEmail, IsString, MaxLength } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @MaxLength(40)
    name: string;
    @IsString()
    @MaxLength(40)
    lastName: string;
    @IsString()
    @MaxLength(10)
    phoneNumber: string;
    @IsString()
    @IsEmail()
    email: string;
}
