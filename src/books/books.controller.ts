import { Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';

@Controller('books')
export class BooksController {
  //menampilkan data
  
  @Get()
  findAll(): string {
    return 'This action returns all books';
  }

//   menyimpan data
@Post()
simpanData(): string {
    return 'This action saves a new book';
  }

//   mengupdate data
@Put(':id')
updateData(@Param('id') id: string): string {
    return 'This action updates a book';
  }

//   menghapus data
@Delete(':id')
deleteData(@Param('id') id: string): string {
    return 'This action deletes a book';
  }
}
