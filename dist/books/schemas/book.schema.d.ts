import { Document } from 'mongoose';
export type BookDocument = Book & Document;
export declare class Book {
    title: string;
    author: string;
    genre: string;
    publishedYear: number;
    isbn: string;
    stockCount: number;
}
export declare const BookSchema: import("mongoose").Schema<Book, import("mongoose").Model<Book, any, any, any, Document<unknown, any, Book, any> & Book & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Book, Document<unknown, {}, import("mongoose").FlatRecord<Book>, {}> & import("mongoose").FlatRecord<Book> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
