import { IsString, MaxLength, IsArray, ArrayNotEmpty } from "class-validator";

export class CreateLocationDto {
    @IsString()
    @MaxLength(35)
    locationName: string;

    @IsString()
    @MaxLength(160)
    locationAddress: string;

    @IsArray()
    @ArrayNotEmpty()
    locationLating: number[];
}
