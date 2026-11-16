import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { GetProductsDto } from './dto/get-products.dto.js';
import { CreateProductDto } from './dto/products.dto.js';


@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(query: GetProductsDto = {}) {
    const { search, maxPrice, sort, page, limit } = query;
    const paginate = page !== undefined || limit !== undefined;
    const take = limit ?? 10;
    return this.prisma.product.findMany({
      where: {
        ...(search ? { title: { contains: search, mode: 'insensitive' as const } } : {}),
        ...(maxPrice !== undefined ? { price: { lte: maxPrice } } : {}),
      },
      orderBy: sort ? [{ price: sort }, { id: 'asc' }] : { id: 'asc' },
      ...(paginate ? { take, skip: ((page ?? 1) - 1) * take } : {}),
    });
  }

  create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }
}
