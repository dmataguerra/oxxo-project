import {IsString, IsNumber, MaxLength} from "class-validator";

export class CreateManagerDto {
    @IsString()
    @MaxLength(80)
    managerFullName : string;
    @IsString()
    managerEmail : string;
    @IsNumber()
    managerSalary : number;
    @IsString()
    @MaxLength(16)
    managerPhoneNumber : string;
}
