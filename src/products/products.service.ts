import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: 'Product A',
      price: 100,
      countSeal: 50,
      provider: '9b5ac9b4-d9c2-4fec-8cf5-88b9f331b4ee' // UUID fijo para pruebas
    },
    {
      productId: uuid(),
      productName: 'Product B',
      price: 200,
      countSeal: 30,
      provider: '9b5ac9b4-d9c2-4fec-8cf5-88b9f331b4ee' // UUID fijo para pruebas
    }
  ];
  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid();
    this.products.push(createProductDto);
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const productFound = this.products.filter((product)=>product.productId === id);
    if(!productFound) throw  new NotFoundException ("Product not found");
    return productFound;
  }

  findByProvider(id: string) {
    const productsFound = this.products.filter((product) => product.provider === id);
    if(productsFound.length === 0) throw new NotFoundException('Products not found for the given provider');
    return productsFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product = this.findOne(id);
    product = {...product, ...updateProductDto};
    return product;

  }

  remove(id: string) {
    this.products = this.products.filter((product) => product.productId !== id);
    return this.products
  }

}
