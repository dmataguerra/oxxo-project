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

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    const savedProduct = this.productRepository.save(product);
    return savedProduct;
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { productId: id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  // findByProvider(id: string) {
  //   const productsFound = this.products.filter((product) => product.provider === id);
  //   if(productsFound.length === 0) throw new NotFoundException('Products not found for the given provider');
  //   return productsFound;
  // }

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
