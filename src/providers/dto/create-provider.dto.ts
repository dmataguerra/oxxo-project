import { MaxLength, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateProviderDto {
    @IsString()
    @MaxLength(100)
    providerName: string;

    @IsEmail()
    providerEmail: string;

    @MaxLength(15)
    @IsString()
    @IsOptional()
    providerPhoneNumber: string;
}
