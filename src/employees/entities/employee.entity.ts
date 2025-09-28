import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import {Location} from "../../locations/entities/location.entity";
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Employee {
    @ApiProperty({
        description: 'Unique identifier for the employee',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'First name of the employee',
        example: 'María Elena'
    })
    @Column({ type: 'text' })
    employeeName: string;

    @ApiProperty({
        description: 'Last name of the employee',
        example: 'González Martínez'
    })
    @Column({ type: 'text' })
    employeeLastName: string;

    @ApiProperty({
        description: 'Phone number of the employee',
        example: '5559876543'
    })
    @Column({ type: 'text' })
    employeePhoneNumber: string;

    @ApiProperty({
        description: 'Email address of the employee (unique)',
        example: 'maria.gonzalez@oxxo.com'
    })
    @Column('text',{ unique : true})
    employeeEmail : string;

    @ApiPropertyOptional({
        description: 'URL or path to employee photo',
        example: 'https://example.com/photos/employee123.jpg'
    })
    @Column({type: 'text', nullable : true,})
    employeePhoto: string;

    @ApiProperty({
        description: 'Location where the employee works',
        type: () => Location
    })
    @ManyToOne(() => Location, (location) => location.employees)
    @JoinColumn({
        name : "locationId"
    })
    location : Location;

    @ApiProperty({
        description: 'User account associated with this employee',
        type: () => User
    })
    @OneToOne(() => User)
    @JoinColumn({
        name : "userId"
    })
    user: User;

}
