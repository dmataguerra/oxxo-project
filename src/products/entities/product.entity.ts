import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Provider } from '../../providers/entities/provider.entity';

@Entity()
export class Product {
    @ApiProperty({
        description: 'Unique identifier for the product',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @PrimaryGeneratedColumn('uuid')
    productId: string;

    @ApiProperty({
        description: 'Name of the product',
        example: 'Coca-Cola 600ml'
    })
    @Column({ type: "text" })
    productName: string;

    @ApiProperty({
        description: 'Price of the product in MXN',
        example: 15.50,
        type: 'number'
    })
    @Column({ type: "float" })
    price: number;

    @ApiProperty({
        description: 'Number of items in stock',
        example: 120,
        type: 'number'
    })
    @Column({ type: "int" })
    countSeal: number;

    @ApiProperty({
        description: 'Provider information for this product',
        type: () => Provider
    })
    @ManyToOne(() => Provider, (provider) => provider.products,{
        eager : true
    })
    @JoinColumn({
        name : "providerId"
    })
    provider: Provider | string;
}
