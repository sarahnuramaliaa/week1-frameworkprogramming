import { Injectable } from '@nestjs/common';

import { Book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0-74327-3565',
      publishedYear: 1925,
      isAvailable: true,
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '978-0-06-112008-4',
      publishedYear: 1960,
      isAvailable: false,
    },
  ];

  // GET semua buku
  findAll(): Book[] {
    return this.books;
  }

  // GET buku berdasarkan ID
  findOne(id: number): Book {
    const book = this.books.find(
      (book) => book.id === id,
    );

    if (!book) {
      throw new Error('Book not found');
    }

    return book;
  }

  // POST tambah buku
  simpanData(createBookDto: CreateBookDto): Book {
    const newId =
      this.books.length > 0
        ? Math.max(
            ...this.books.map((book) => book.id),
          ) + 1
        : 1;

    const newBook: Book = {
      id: newId,
      title: createBookDto.title,
      author: createBookDto.author,
      isbn: createBookDto.isbn,
      publishedYear: createBookDto.publishedYear,
      isAvailable: true,
    };

    this.books.push(newBook);

    return newBook;
  }

  // PUT update buku
  updateData(
    id: number,
    createBookDto: CreateBookDto,
  ): Book {
    const bookIndex = this.books.findIndex(
      (book) => book.id === id,
    );

    if (bookIndex === -1) {
      throw new Error('Book not found');
    }

    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...createBookDto,
    };

    return this.books[bookIndex];
  }

  // DELETE buku
  deleteData(id: number): void {
    const bookIndex = this.books.findIndex(
      (book) => book.id === id,
    );

    if (bookIndex === -1) {
      throw new Error('Book not found');
    }

    this.books.splice(bookIndex, 1);
  }
}