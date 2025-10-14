import { ApiProperty } from '@nestjs/swagger';
import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import {Location} from "../../locations/entities/location.entity";
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Manager {
    @ApiProperty({
        description: 'Unique identifier for the manager',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @PrimaryGeneratedColumn('uuid')
    managerId : string;

    @ApiProperty({
        description: 'Full name of the manager',
        example: 'Carlos Alberto Rodríguez García'
    })
    @Column('text')
    managerFullName: string;

    @ApiProperty({
        description: 'Monthly salary in MXN',
        example: 25000.00,
        type: 'number'
    })
    @Column('float')
    managerSalary : number;

    @ApiProperty({
        description: 'Email address of the manager',
        example: 'carlos.rodriguez@oxxo.com'
    })
    @Column('text')
    managerEmail : string;

    @ApiProperty({
        description: 'Phone number of the manager',
        example: '5551234567'
    })
    @Column('text')
    managerPhoneNumber : string;

    @ApiProperty({
        description: 'Location managed by this manager',
        type: () => Location
    })
    @OneToOne(() => Location)
    @JoinColumn({
        name: "locationId"
    })
    location : Location;

    @ApiProperty({
        description: 'User account associated with this manager',
        type: () => User
    })
    @OneToOne(() => User)
    @JoinColumn({
        name : "userId"
    })
    user : User;
}
