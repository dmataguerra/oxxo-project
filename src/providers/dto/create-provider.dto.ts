import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaxLength, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateProviderDto {
    @ApiProperty({
        description: 'Name of the provider company',
        example: 'Coca-Cola FEMSA',
        maxLength: 100
    })
    @IsString()
    @MaxLength(100)
    providerName: string;

    @ApiProperty({
        description: 'Email contact of the provider',
        example: 'contacto@cocacola.com'
    })
    @IsEmail()
    providerEmail: string;

    @ApiPropertyOptional({
        description: 'Phone number of the provider',
        example: '5559876543',
        maxLength: 15
    })
    @MaxLength(15)
    @IsString()
    @IsOptional()
    providerPhoneNumber: string;
}
