import { Controller, Delete, Get, Post, Put, Body, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-categories-dto.js';

@Controller('categories')
export class CategoriesController {

    constructor(
        private readonly categoriesService: CategoriesService
    ){}


    // get data all
    @Get()
    findAll(){
        return this.categoriesService.findAll()
    }


    // get by id

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.categoriesService.findOne(id)
    }


    // tambah data baru

    @Post()
   create(@Body() category: CreateCategoryDto) {
   return this.categoriesService.create(category);
    }

    @Put(':id')
    update(id: string, updateCategory: CreateCategoryDto){
        return this.categoriesService.update(id, updateCategory)
    }


    @Delete(':id')
    remove(@Param('id') id: string){
        return this.categoriesService.remove(id)
    }

}
