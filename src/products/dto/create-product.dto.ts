import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, IsInt } from 'class-validator';
export class CreateProductDto {
    @IsUUID('4', { message: 'productId must be a valid UUID' })
    @IsOptional()
    productId: string;
    @IsString()
    @MaxLength(40)
    productName: string;
    @IsNumber()
    price: number;
    @IsInt()
    countSeal: number;
    @IsString()
    @IsUUID('4', { message: 'providerId must be a valid UUID' })
    @IsOptional()
    providerId: string;
}
