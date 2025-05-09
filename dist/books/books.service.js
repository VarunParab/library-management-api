"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const book_schema_1 = require("./schemas/book.schema");
const fuzzysort = require("fuzzysort");
let BooksService = class BooksService {
    bookModel;
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async create(createBookDto) {
        const createdBook = new this.bookModel(createBookDto);
        return createdBook.save();
    }
    async findAll(page = 1, limit = 10) {
        return this.bookModel
            .find()
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    }
    async findOne(id) {
        const book = await this.bookModel.findById(id);
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        return book;
    }
    async update(id, updateBookDto) {
        const updated = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Book not found');
        return updated;
    }
    async remove(id) {
        const deleted = await this.bookModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('Book not found');
        return deleted;
    }
    async search(query) {
        const books = await this.bookModel.find().exec();
        const results = fuzzysort.go(query, books, {
            keys: ['title', 'author', 'genre'],
            threshold: -10000,
        });
        return results.map(r => r.obj);
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(book_schema_1.Book.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BooksService);
//# sourceMappingURL=books.service.js.map