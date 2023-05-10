import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title',
    uniqueItems: true,
    example: 'Awesome Product',
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product title',
    default: 0,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 'Awesome Product',
    default: null,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'awesome_product',
    default: null,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    default: 0,
    example: 0,
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  stock?: number;

  @ApiProperty({
    example: ['S', 'M', 'XL'],
    description: 'Product sizes',
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    example: 'women',
    description: 'Product gender',
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty({
    default: [],
    example: ['t-shirt'],
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
