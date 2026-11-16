import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class GetProductsDto {
  @ApiPropertyOptional({ example: 'клавиатура', description: 'Поиск по названию без учёта регистра' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @ApiPropertyOptional({ example: 80, minimum: 0, description: 'Максимальная цена' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ enum: ['asc', 'desc'], description: 'Сортировка по цене: asc - по возрастанию, desc - по убыванию' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';

  @ApiPropertyOptional({ example: 1, minimum: 1, maximum: 1000000, description: 'Номер страницы. При включении пагинации по умолчанию 1' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000000)
  page?: number;

  @ApiPropertyOptional({ example: 10, minimum: 1, maximum: 100, description: 'Товаров на странице. При включении пагинации по умолчанию 10' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}
