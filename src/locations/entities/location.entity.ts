import { ApiProperty } from '@nestjs/swagger';
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {Manager} from "../../managers/entities/manager.entity";
import {Region} from "../../regions/entities/region.entity";
import {Employee} from "../../employees/entities/employee.entity";

@Entity()
export class Location {
    @ApiProperty({
        description: 'Unique identifier for the location',
        example: 1,
        type: 'number'
    })
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        description: 'Name of the OXXO location/store',
        example: 'OXXO Centro Histórico'
    })
    @Column('text')
    locationName: string;

    @ApiProperty({
        description: 'Physical address of the location',
        example: 'Av. Juárez 123, Col. Centro, CDMX, C.P. 06000'
    })
    @Column('text')
    locationAddress: string;

    @ApiProperty({
        description: 'Latitude and longitude coordinates [lat, lng]',
        example: [19.4326, -99.1332],
        type: 'array',
        items: { type: 'number' }
    })
    @Column('float', { array: true })
    locationLating: number[];

    @ApiProperty({
        description: 'Manager assigned to this location',
        type: () => Manager
    })
    @OneToOne(() => Manager, {eager : true})
    @JoinColumn({
        name : "managerId"
    })
    manager : Manager;

    @ApiProperty({
        description: 'Region this location belongs to',
        type: () => Region
    })
    @ManyToOne(() => Region, (region) => region.locations,{
        eager : true
    })
    @JoinColumn({
        name : "regionId"
    })
    region : Region;

    @ApiProperty({
        description: 'List of employees working at this location',
        type: () => [Employee],
        isArray: true
    })
    @OneToMany(() => Employee, (employee) => employee.location)
    employees : Employee[];
}
