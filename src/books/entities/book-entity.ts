
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Category } from '../../categories/entities/categories-entity.js';
import { Publisher } from '../../publishers/entities/publishers.entity.js';
import { BookAuthor } from '../../book-authors/entities/book-authors.entity.js';  
import { OrderItem } from '../../order-items/entities/order-item.entity.js';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 65 })
  title: string;

  @Column({ type: 'varchar', length: 65 })
  author: string;

  @Column({ type: 'varchar' })
  isbn: string;

  @Column({ type: 'int', default: 0 })
  publishedYear: number;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  @UpdateDateColumn({ name: 'update' })
  updatedAt: Date;
  
  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedaat: Date;
  
  @ManyToOne(() => Category, (category) => category.books)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Publisher, (publisher) => publisher.books)
@JoinColumn({ name: 'publisher_id' })
publisher: Relation<Publisher>;

@OneToMany(() => BookAuthor, (bookAuthor) => bookAuthor.book)
bookAuthors: Relation<BookAuthor[]>;

@OneToMany(() => OrderItem, (orderItem) => orderItem.book)
orderItems: Relation<OrderItem[]>;
  
}
