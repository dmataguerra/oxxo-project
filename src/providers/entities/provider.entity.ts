import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Provider {
    @ApiProperty({
        description: 'Unique identifier for the provider',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @PrimaryGeneratedColumn('uuid')
    providerId: string;

    @ApiProperty({
        description: 'Name of the provider company',
        example: 'Coca-Cola FEMSA'
    })
    @Column('text')
    providerName: string;

    @ApiProperty({
        description: 'Email address of the provider',
        example: 'contacto@cocacola.com'
    })
    @Column('text')
    providerEmail: string;

    @ApiPropertyOptional({
        description: 'Phone number of the provider',
        example: '5551234567'
    })
    @Column({
        type: 'text',
        nullable: true,
        unique: true
    })
    providerPhoneNumber: string;

    @ApiProperty({
        description: 'List of products supplied by this provider',
        type: () => [Product],
        isArray: true
    })
    @OneToMany(() => Product, (product) => product.provider)
    products: Product[];
}
