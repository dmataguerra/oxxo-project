import { IsString, MaxLength, IsArray, ArrayNotEmpty, IsUUID, IsNumber, IsOptional , IsObject} from "class-validator";
import { Region } from "src/regions/entities/region.entity";

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

    @IsUUID()
    @IsOptional()
    managerId?: string;

    @IsNumber()
    @IsOptional()
    regionId?: number;

    @IsObject()
    @IsOptional()
    region: Region;
}
