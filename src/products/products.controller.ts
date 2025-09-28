import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {ROLES} from 'src/auth/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version : '4'})) id: string) {
    return this.productsService.findOne(id);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get('provider/:id')
    findByProvider(@Param('id', new ParseUUIDPipe({version : '4'})) id: string) {
    return this.productsService.findByProvider(id);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version : '4'})) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
