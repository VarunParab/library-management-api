import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import * as fuzzysort from 'fuzzysort';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async findAll(page = 1, limit = 10): Promise<Book[]> {
    return this.bookModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updated = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
    if (!updated) throw new NotFoundException('Book not found');
    return updated;
  }

  async remove(id: string): Promise<Book> {
    const deleted = await this.bookModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Book not found');
    return deleted;
  }
  async search(query: string): Promise<Book[]> {
    const books = await this.bookModel.find().exec();
  
    const results = fuzzysort.go(query, books, {
      keys: ['title', 'author', 'genre'],
      threshold: -10000, // Optional, controls how "fuzzy" it is
    });
  
    return results.map(r => r.obj);
  }
}
