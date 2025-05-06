import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsNumber()
  publishedYear: number;

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsNumber()
  stockCount: number;
}
