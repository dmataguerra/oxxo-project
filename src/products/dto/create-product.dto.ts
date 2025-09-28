import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, IsInt } from 'class-validator';

export class CreateProductDto {
    @ApiPropertyOptional({
        description: 'Product unique identifier',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'productId must be a valid UUID' })
    @IsOptional()
    productId: string;

    @ApiProperty({
        description: 'Name of the product',
        example: 'Coca-Cola 600ml',
        maxLength: 40
    })
    @IsString()
    @MaxLength(40)
    productName: string;

    @ApiProperty({
        description: 'Price of the product in MXN',
        example: 18.50,
        type: 'number'
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'Number of items in inventory',
        example: 100,
        type: 'integer'
    })
    @IsInt()
    countSeal: number;

    @ApiPropertyOptional({
        description: 'Provider UUID who supplies this product',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsString()
    @IsUUID('4', { message: 'providerId must be a valid UUID' })
    @IsOptional()
    providerId: string;
}
