import { ApiProperty } from '@nestjs/swagger';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm" ;
import {Location} from "../../locations/entities/location.entity";

@Entity()
export class Region {
    @ApiProperty({
        description: 'Unique identifier for the region',
        example: 1,
        type: 'number'
    })
    @PrimaryGeneratedColumn('increment')
    regionId : number;

    @ApiProperty({
        description: 'Name of the region (unique)',
        example: 'Centro de México'
    })
    @Column ({
        type : 'text',
        unique : true
    })
    regionName : string;

    @ApiProperty({
        description: 'Array of states included in this region',
        example: ['Ciudad de México', 'Estado de México', 'Morelos'],
        type: 'array',
        items: { type: 'string' }
    })
    @Column('text', { array: true })
    regionStates : string[];

    @ApiProperty({
        description: 'List of locations in this region',
        type: () => [Location],
        isArray: true
    })
    @OneToMany(() => Location, (location) => location.region)
    locations : Location[];
}
