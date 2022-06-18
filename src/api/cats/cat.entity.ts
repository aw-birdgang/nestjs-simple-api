import {ApiProperty} from '@nestjs/swagger';

export class Cat {

  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '번식' })
  breed: string;

  @ApiProperty({ description: '나이' })
  age: number;

  static of(params: Partial<Cat>): Cat {
    const cat = new Cat();
    Object.assign(cat, params);
    return cat;
  }

  update(
    name: string,
    breed: string,
    age: number,
  ): void {
    this.name = name;
    this.breed = breed;
    this.age = age;
  }

  toString() {
    return (
      ' name : ' +
      this.breed.toString() +
      ', last_updated : ' +
      this.breed.toString() +
      ', age : ' +
      this.age.toString()
    );
  }
}
