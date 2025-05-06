import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  publishedYear: number;

  @Prop({ required: true, unique: true })
  isbn: string;

  @Prop({ required: true, default: 0 })
  stockCount: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
