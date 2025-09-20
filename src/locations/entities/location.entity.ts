import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {Manager} from "../../managers/entities/manager.entity";
import {Region} from "../../regions/entities/region.entity";
import {Employee} from "../../employees/entities/employee.entity";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;
    @Column('text')
    locationName: string;
    @Column('text')
    locationAddress: string;
    @Column('integer', { array: true })
    locationLating: number[];
    @OneToOne(() => Manager)
    @JoinColumn({
        name : "managerId"
    })
    manager : Manager;
    @ManyToOne(() => Region, (region) => region.locations,{
        eager : true
    })
    @JoinColumn({
        name : "regionId"
    })
    region : Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees : Employee[];
}
