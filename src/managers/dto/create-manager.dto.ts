import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsString, IsNumber, MaxLength, IsUUID, IsOptional} from "class-validator";

export class CreateManagerDto {
    @ApiProperty({
        description: 'Full name of the manager',
        example: 'Carlos Alberto Rodríguez García',
        maxLength: 80
    })
    @IsString()
    @MaxLength(80)
    managerFullName : string;

    @ApiProperty({
        description: 'Email address of the manager',
        example: 'carlos.rodriguez@oxxo.com'
    })
    @IsString()
    managerEmail : string;

    @ApiProperty({
        description: 'Monthly salary in MXN',
        example: 25000.00,
        type: 'number'
    })
    @IsNumber()
    managerSalary : number;

    @ApiProperty({
        description: 'Phone number of the manager',
        example: '5551234567',
        maxLength: 16
    })
    @IsString()
    @MaxLength(16)
    managerPhoneNumber : string;

    @ApiPropertyOptional({
        description: 'User UUID associated with this manager',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID()
    @IsOptional()
    userId?: string;
}
