import {IsString, MaxLength, IsArray} from 'class-validator';
import {Region} from "../entities/region.entity";
export class CreateRegionDto {
    @IsString()
    @MaxLength(100)
    regionName : string;
    @IsArray()
    regionStates : string[];
}
