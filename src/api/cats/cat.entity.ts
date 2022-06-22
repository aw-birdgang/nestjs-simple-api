import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cat extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ length: 50 })
  @ApiProperty({ description: '이름' })
  name: string;

  @Column({ length: 50 })
  @ApiProperty({ description: '번식' })
  breed: string;

  @Column()
  @ApiProperty({ description: '나이' })
  age: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  static of(params: Partial<Cat>): Cat {
    const cat = new Cat();
    Object.assign(cat, params);
    return cat;
  }

  update(name: string, breed: string, age: number): void {
    this.name = name;
    this.breed = breed;
    this.age = age;
  }

  toString() {
    return (
      ' name : ' +
      this.name.toString() +
      ', breed : ' +
      this.breed.toString() +
      ', age : ' +
      this.age.toString()
    );
  }
}
