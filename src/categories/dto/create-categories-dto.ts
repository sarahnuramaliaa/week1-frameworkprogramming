import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateCategoryDto{
    @IsNotEmpty({message: 'Nama kategori harus di isi'})
    @MaxLength(100, {message: 'Nama kategori maskimal 100 karakter'})
    readonly name: string;
}