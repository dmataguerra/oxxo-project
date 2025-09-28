import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column,  PrimaryGeneratedColumn } from "typeorm";
import { OneToOne } from "typeorm";
import { Manager } from "../../managers/entities/manager.entity";
import { Employee } from "../../employees/entities/employee.entity";

@Entity()
export class User{
    @ApiProperty({
        description: 'Unique identifier for the user',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @PrimaryGeneratedColumn('uuid')
    userId : string;

    @ApiProperty({
        description: 'Email address for user login (unique)',
        example: 'admin@oxxo.com'
    })
    @Column('text',{unique : true})
    userEmail : string;

    @ApiProperty({
        description: 'Hashed password for user authentication',
        example: '$2b$10$hash...'
    })
    @Column('text')
    userPassword : string;

    @ApiProperty({
        description: 'Array of user roles for authorization',
        example: ['Employee'],
        default: 'Employee',
        type: 'array',
        items: { type: 'string' }
    })
    @Column('simple-array', {
        default : 'Employee'
    })
    userRoles : string[];

    @ApiPropertyOptional({
        description: 'Manager profile associated with this user',
        type: () => Manager
    })
    @OneToOne(() => Manager
    )
    manager: Manager;

    @ApiPropertyOptional({
        description: 'Employee profile associated with this user',
        type: () => Employee
    })
    @OneToOne(() => Employee
    )
    employee: Employee;
}