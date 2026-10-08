import { Controller, Get, Param, Post, Put, Delete, Body, Query } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { Book } from './entities/book-entity.js';

@Controller('books')
export class BooksController {

  constructor(private readonly booksService: BooksService) {}
  
  //menampilkan data
  
  @Get()
  findAll(){
    return this.booksService.findAll();
  }

//   menyimpan data
@Post()
simpanData(@Body() CreateBookDto: CreateBookDto){
    return this.booksService.simpanData(CreateBookDto);
  }

//   mengupdate data
@Put(':id')
updateData(
  @Param('id') id: string, 
  @Body() createBookDto: CreateBookDto){
    return this.booksService.updateData(Number(id), createBookDto);
  }

//   menghapus data
@Delete(':id')
deleteData(@Param('id') id: string): void {
    this.booksService.deleteData(parseInt(id));
  }
}
