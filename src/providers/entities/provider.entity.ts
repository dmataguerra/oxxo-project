import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;
    @Column('text')
    providerName: string;
    @Column('text')
    providerEmail: string;
    @Column({
        type: 'text',
        nullable: true,
    })
    providerPhoneNumber: string;
    @OneToMany(() => Product, (product) => product.provider)
    products: Product[];
}
