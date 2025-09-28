import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, IsIn, IsOptional} from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    userEmail : string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    userPassword: string;
    
    @ApiProperty()
    @IsOptional()
    @IsIn(['Admin', 'Manager', 'Employee'])
    userRoles: string[];
}
