import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository : Repository<Product>) {
    
  } 

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create({
      ...createProductDto,
      provider: createProductDto.providerId ? { providerId: createProductDto.providerId } as any : undefined,
    });
    return await this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find({relations : { provider: true,}});
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { productId: id } , relations : { provider: true,}});
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

   findByProvider(id: string) {
      return this.productRepository.findBy({
        provider: {
          providerId: id,
        }
      })
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: string) {
    const result = await this.productRepository.delete({ productId: id });
    if (result.affected === 0) throw new NotFoundException('Product not found');
    return { message: 'Product deleted successfully' };
  }

}
