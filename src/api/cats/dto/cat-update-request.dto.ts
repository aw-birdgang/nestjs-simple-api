import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CatUpdateRequestDto {
  @IsNotEmpty({ message: '이름(name)은 필수 값입니다.' })
  @IsString({ message: '이름(name)의 형식이 올바르지 않습니다.' })
  @Length(1, 50)
  @ApiProperty({ description: '이름' })
  name: string;

  @IsNotEmpty({ message: '번식(breed)은 필수 값 입니다.' })
  @IsString({ message: '번식(breed)의 형식이 올바르지 않습니다.' })
  @Length(1, 50)
  @ApiProperty({ description: '번식' })
  breed: string;

  @IsNotEmpty({ message: '나이(age)은 필수 값 입니다.' })
  @IsInt({ message: '나이(age)의 형식이 올바르지 않습니다.' })
  @ApiProperty({ description: '나이' })
  age: number;
}
