import { Injectable, NotFoundException } from '@nestjs/common';

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

    async findOne(id: string): Promise<Book>{
      // cari berdasarkan id
      const book = await this.bookRepository.findOneBy({id})
      if(!book){
        throw new NotFoundException(`Buku ${id} tidak ditemukan`)
      }
      // jika buku ditemukann
      return book
    }
  

  // POST tambah buku
   async simpanData(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create(createBookDto);

    return await this.bookRepository.save (newBook);
  }



  // PUT update buku
  async updateData(id: string, createBookDto: CreateBookDto): Promise<Book>{
    const book = await this.findOne(id)
    const updatedBook = await this.bookRepository.merge(book, createBookDto)

    return await this.bookRepository.save(updatedBook)
  }

   // DELETE buku
  async deleteData(id: string): Promise<{message: string, deletedId: string}> {
    await this.findOne(id)
    await this.bookRepository.softDelete(id)

    return {
      message:`Data ${id} berhasil dihapus`,
      deletedId: id
    }
  }
}