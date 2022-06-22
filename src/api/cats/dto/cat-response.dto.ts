import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Cat } from '../cat.entity';

export class CatResponseDto {
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _breed: string;
  @Exclude() private readonly _age: number;

  constructor(cat: Cat) {
    this._name = cat.name;
    this._breed = cat.breed;
    this._age = cat.age;
  }

  @ApiProperty({ description: '이름' })
  @Expose()
  get name(): string {
    return this._name;
  }
  @ApiProperty({ description: '번식' })
  @Expose()
  get breed(): string {
    return this._breed;
  }
  @ApiProperty({ description: '나이' })
  @Expose()
  get age(): number {
    return this._age;
  }
}
