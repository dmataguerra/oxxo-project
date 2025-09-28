import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength, IsArray, ArrayNotEmpty, IsUUID, IsNumber, IsOptional , IsObject} from "class-validator";
import { Region } from "src/regions/entities/region.entity";

export class CreateLocationDto {
    @ApiProperty({
        description: 'Name of the OXXO location/store',
        example: 'OXXO Centro Histórico',
        maxLength: 35
    })
    @IsString()
    @MaxLength(35)
    locationName: string;

    @ApiProperty({
        description: 'Physical address of the location',
        example: 'Av. Juárez 123, Col. Centro, CDMX, C.P. 06000',
        maxLength: 160
    })
    @IsString()
    @MaxLength(160)
    locationAddress: string;

    @ApiProperty({
        description: 'Latitude and longitude coordinates [lat, lng]',
        example: [19.4326, -99.1332],
        type: 'array',
        items: { type: 'number' }
    })
    @IsArray()
    @ArrayNotEmpty()
    locationLating: number[];

    @ApiPropertyOptional({
        description: 'UUID of the manager assigned to this location',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID()
    @IsOptional()
    managerId?: string;

    @ApiPropertyOptional({
        description: 'ID of the region this location belongs to',
        example: 1,
        type: 'number'
    })
    @IsNumber()
    @IsOptional()
    regionId?: number;

    @ApiPropertyOptional({
        description: 'Region object this location belongs to',
        type: () => Region
    })
    @IsObject()
    @IsOptional()
    region: Region;
}
