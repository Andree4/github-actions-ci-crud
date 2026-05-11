import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  create(@Body() product: Omit<Product, 'id'>): Product {
    return this.service.create(product);
  }

  @Get()
  findAll(): Product[] {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product | undefined {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() update: Partial<Product>,
  ): Product | null {
    return this.service.update(+id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string): boolean {
    return this.service.remove(+id);
  }
}
