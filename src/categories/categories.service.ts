import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categories-entity.js';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-categories-dto.js';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    
    ){}


// menampilkan semua data kategori
    async findAll(): Promise<Category[]>{
        return await this.categoryRepository.find({
            order:{created_at:'DESC'}
        })
    }


// menampilkan kategori berdasrkan id
    async findOne(id:string): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({id})
        if(!category){
            throw new NotFoundException(`Kategori ${id} tidak ditemukan`)
        }
        return category;
    }

// menyimpan data kategori baru

    async create(category: CreateCategoryDto): Promise<Category> {
        const newCategory = this.categoryRepository.create(category);

        return await this.categoryRepository.save(newCategory);
    }   

// mengubah data kategori berdasarkan id
    async update(id: string,updateCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = await this.findOne(id);
        const updateCategory = this.categoryRepository.merge(category, updateCategoryDto);
        return await this.categoryRepository.save(updateCategory);
    }

// menghapus data kategori berdasarkan id
    async remove(id: string): Promise<void> {
        const category = await this.findOne(id);
        await this.categoryRepository.remove(category);
    }
}
