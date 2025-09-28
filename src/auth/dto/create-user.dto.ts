import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, IsIn, IsOptional} from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        default: 'dmataguerra@outlook.com'
    })
    @IsEmail()
    userEmail : string;

    @ApiProperty({
        default: 'strongPassword123'
    })
    @IsString()
    @MinLength(8)
    userPassword: string;
    
    @ApiProperty({
        default: 'Employee',
        enum: ['Admin', 'Manager', 'Employee']
    })
    @IsOptional()
    @IsIn(['Admin', 'Manager', 'Employee'])
    userRoles: string[];
}
