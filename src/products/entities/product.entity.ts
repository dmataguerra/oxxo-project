import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Provider } from '../../providers/entities/provider.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    productId: string;
    @Column({ type: "text" })
    productName: string;
    @Column({ type: "float" })
    price: number;
    @Column({ type: "int" })
    countSeal: number;
    @ManyToOne(() => Provider, (provider) => provider.products)
    provider: Provider;
}
