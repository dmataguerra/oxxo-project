import { ApiProperty } from '@nestjs/swagger';
import {IsString, MaxLength, IsArray} from 'class-validator';
import {Region} from "../entities/region.entity";

export class CreateRegionDto {
    @ApiProperty({
        description: 'Name of the region',
        example: 'Centro de México',
        maxLength: 100
    })
    @IsString()
    @MaxLength(100)
    regionName : string;

    @ApiProperty({
        description: 'Array of states included in this region',
        example: ['Ciudad de México', 'Estado de México', 'Morelos'],
        type: 'array',
        items: { type: 'string' }
    })
    @IsArray()
    regionStates : string[];
}
