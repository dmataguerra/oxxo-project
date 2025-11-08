import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @ApiPropertyOptional({
        description: 'Photo URL of the employee',
        example: 'https://s3.amazonaws.com/bucket/photo.jpg'
    })
    @IsOptional()
    @IsString()
    employeePhoto?: string;
}
