import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {ROLES} from 'src/auth/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { ApiResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorators/api.decorators';

@ApiTags('Products')
@ApiAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ 
    summary: 'Create new product',
    description: 'Create a new product (Admin/Manager only)'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Product created successfully' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Insufficient permissions' 
  })
  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ 
    summary: 'Get all products',
    description: 'Retrieve list of all products in inventory'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of products retrieved successfully' 
  })
  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ 
    summary: 'Get product by ID',
    description: 'Retrieve a specific product by its UUID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Product UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Product found' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Product not found' 
  })
  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version : '4'})) id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ 
    summary: 'Get products by provider',
    description: 'Retrieve all products from a specific provider'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Provider UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Products from provider retrieved' 
  })
  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Get('provider/:id')
    findByProvider(@Param('id', new ParseUUIDPipe({version : '4'})) id: string) {
    return this.productsService.findByProvider(id);
  }

  @ApiOperation({ 
    summary: 'Update product',
    description: 'Update product information by ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Product UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Product updated successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Product not found' 
  })
  @Auth(ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version : '4'})) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ 
    summary: 'Delete product',
    description: 'Remove a product from inventory (Admin/Manager only)'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Product UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Product deleted successfully' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - Insufficient permissions' 
  })
  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
