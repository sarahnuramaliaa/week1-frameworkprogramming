import { Injectable } from '@nestjs/common';

import { Book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>

  ){}
  
  // GET semua buku
  async findAll():Promise<Book[]> {
    return await this.bookRepository.find({
      order:{createdAt: 'DESC'}
    });
  }

  // // GET buku berdasarkan ID
  // findOne(id: number): Book {
  //   const book = this.books.find(
  //     (book) => book.id === id,
  //   );

  //   if (!book) {
  //     throw new Error('Book not found');
  //   }

  //   return book;
  // }

  // POST tambah buku
   async simpanData(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create(createBookDto);

    return await this.bookRepository.save (newBook);
  }

  // // PUT update buku
  // updateData(
  //   id: number,
  //   createBookDto: CreateBookDto,
  // ): Book {
  //   const bookIndex = this.books.findIndex(
  //     (book) => book.id === id,
  //   );

  //   if (bookIndex === -1) {
  //     throw new Error('Book not found');
  //   }

  //   this.books[bookIndex] = {
  //     ...this.books[bookIndex],
  //     ...createBookDto,
  //   };

  //   return this.books[bookIndex];
  // }

  // // DELETE buku
  // deleteData(id: number): void {
  //   const bookIndex = this.books.findIndex(
  //     (book) => book.id === id,
  //   );

  //   if (bookIndex === -1) {
  //     throw new Error('Book not found');
  //   }

  //   this.books.splice(bookIndex, 1);
  // }
}