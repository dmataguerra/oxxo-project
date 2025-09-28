import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsObject, IsString, MaxLength, IsOptional, IsUUID } from "class-validator";

export class LocationEmployeeDto {
    @ApiProperty()
    @IsNumber()
    locationId: number;

    @ApiPropertyOptional()
    @IsString()
    locationName?: string;

    @ApiPropertyOptional()
    locationLating?: number[];

    @ApiPropertyOptional()
    @IsString()
    locationAddress?: string;
}


export class CreateEmployeeDto{ 
    @ApiProperty()
    @IsString()
    @MaxLength(40)
    employeeName: string;
    
    @ApiProperty()
    @IsString()
    @MaxLength(40)
    employeeLastName: string;
    
    @ApiProperty()
    @IsString()
    @MaxLength(10)
    employeePhoneNumber: string;
    
    @ApiProperty()
    @IsString()
    @IsEmail()
    employeeEmail: string;
    
    @ApiProperty()
    @IsOptional()
    @IsObject()
    location : LocationEmployeeDto;
}

