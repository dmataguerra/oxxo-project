import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, MinLength} from 'class-validator'; 

export class LoginUserDto {
    @ApiProperty({
        description: 'Email address for login',
        example: 'admin@oxxo.com'
    })
    @IsString()
    @IsEmail()
    userEmail : string;

    @ApiProperty({
        description: 'User password (minimum 8 characters)',
        example: 'MySecurePass123!',
        minLength: 8
    })
    @IsString()
    @MinLength(8)
    userPassword : string;
}