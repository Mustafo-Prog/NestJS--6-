import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/products.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RoleGuard } from '../auth/guards/role.guard.js';
import { Role } from '../auth/guards/role.decorator.js';
import { GetProductsDto } from './dto/get-products.dto.js';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список товаров', description: 'Публичный маршрут. Поиск, фильтр по цене и сортировка необязательны. Пагинация включается при передаче page или limit.' })
  @ApiResponse({
    status: 200,
    description: "Список товаров получен"
  })
  @ApiResponse({
    status: 400,
    description: "Некорректные параметры запроса"
  })
  findAll(@Query() query: GetProductsDto) {
    return this.productsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('SELLER')
  @Post()
  @ApiOperation({ summary: 'Создать товар', description: 'Доступно пользователю с ролью SELLER.' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Товар создан' })
  @ApiResponse({ status: 400, description: 'Некорректные данные товара' })
  @ApiResponse({ status: 401, description: 'JWT отсутствует, недействителен или истёк' })
  @ApiResponse({ status: 403, description: 'Требуется роль SELLER' })
  create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }
}
