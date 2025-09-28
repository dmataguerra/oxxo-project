import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsObject, IsString, MaxLength, IsOptional, IsUUID } from "class-validator";

export class LocationEmployeeDto {
    @ApiProperty({
        description: 'ID of the location',
        example: 1,
        type: 'number'
    })
    @IsNumber()
    locationId: number;

    @ApiPropertyOptional({
        description: 'Name of the location',
        example: 'OXXO Centro'
    })
    @IsString()
    locationName?: string;

    @ApiPropertyOptional({
        description: 'Latitude and longitude coordinates of the location',
        example: [19.4326, -99.1332],
        type: 'array',
        items: { type: 'number' }
    })
    locationLating?: number[];

    @ApiPropertyOptional({
        description: 'Physical address of the location',
        example: 'Av. Reforma 123, Col. Centro, CDMX'
    })
    @IsString()
    locationAddress?: string;
}


export class CreateEmployeeDto{ 
    @ApiProperty({
        description: 'First name of the employee',
        example: 'María Elena',
        maxLength: 40
    })
    @IsString()
    @MaxLength(40)
    employeeName: string;
    
    @ApiProperty({
        description: 'Last name of the employee',
        example: 'González Martínez',
        maxLength: 40
    })
    @IsString()
    @MaxLength(40)
    employeeLastName: string;
    
    @ApiProperty({
        description: 'Phone number of the employee',
        example: '5559876543',
        maxLength: 10
    })
    @IsString()
    @MaxLength(10)
    employeePhoneNumber: string;
    
    @ApiProperty({
        description: 'Email address of the employee',
        example: 'maria.gonzalez@oxxo.com'
    })
    @IsString()
    @IsEmail()
    employeeEmail: string;
    
    @ApiPropertyOptional({
        description: 'Location information where the employee works',
        type: LocationEmployeeDto
    })
    @IsOptional()
    @IsObject()
    location : LocationEmployeeDto;
}

