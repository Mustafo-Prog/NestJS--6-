import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Клавиатура', description: 'Название товара', minLength: 2, maxLength: 100 })
  @IsString()
  @Length(2, 100)
  title: string;

  @ApiProperty({ example: 50, description: 'Цена товара', minimum: 0, maximum: 100 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  price: number;
}
