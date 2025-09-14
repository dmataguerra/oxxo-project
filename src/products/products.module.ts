import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Provider } from '../providers/entities/provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Provider])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
