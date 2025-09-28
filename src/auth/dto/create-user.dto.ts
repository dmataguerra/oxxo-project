import { IsEmail, IsString, MinLength, IsIn, IsOptional} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    userEmail : string;
    @IsString()
    @MinLength(8)
    userPassword: string;
    @IsOptional()
    @IsIn(['Admin', 'Manager', 'Employee'])
    userRoles: string[];
}
