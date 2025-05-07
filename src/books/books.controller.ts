import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { RateLimit } from 'nestjs-rate-limiter';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @RateLimit({ points: 5, duration: 60 }) // 5 POST requests/min per IP
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @RateLimit({ points: 10, duration: 60 }) // 10 GETs/min
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.booksService.findAll(+page, +limit);
  }

  @Get('/search')
  @RateLimit({ points: 10, duration: 60 })
  search(@Query('query') query: string) {
    return this.booksService.search(query);
  }

  @Get(':id')
  @RateLimit({ points: 10, duration: 60 })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @RateLimit({ points: 5, duration: 60 })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @RateLimit({ points: 3, duration: 60 })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
