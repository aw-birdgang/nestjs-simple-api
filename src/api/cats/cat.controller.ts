import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CatCreateRequestDto } from './dto/cat-create-request.dto';
import { CatService } from './cat.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Cat } from './cat.entity';
import { CatResponseDto } from './dto/cat-response.dto';
import { instanceToPlain } from 'class-transformer';
import { CatUpdateRequestDto } from './dto/cat-update-request.dto';

@Controller('cat')
@ApiTags('Cat API')
export class CatController {
  constructor(private readonly catsService: CatService) {}

  private readonly logger = new Logger(CatController.name);

  @Post()
  @ApiOperation({ summary: '캣 을 생성 API', description: '캣 을 생성 한다.' })
  @ApiCreatedResponse({ description: '캣 을 생성 한다.', type: Cat })
  async create(
    @Body() createCatDto: CatCreateRequestDto,
    @Res() res: Response,
  ) {
    const cat = await this.catsService.createCat(createCatDto);
    return res.status(HttpStatus.CREATED).json(cat);
  }

  @Get()
  @ApiOperation({ summary: '모든 캣 을 조회 API' })
  @ApiOkResponse({ description: '모든 캣 을 조회 한다.', type: Cat })
  async findAll(@Res() res: Response) {
    const cats = await this.catsService.findAll();
    return res.status(HttpStatus.OK).json(cats);
  }

  @Get(':id')
  @ApiOperation({ summary: '캣 정보 조회 API' })
  @ApiOkResponse({
    description: 'Id가 일치 하는 캣 정보를 조회 한다.',
    type: CatResponseDto,
  })
  async findById(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const responseDto = await this.catsService.findById(id);
    return res.status(HttpStatus.OK).json(instanceToPlain(responseDto));
  }

  @Put(':id')
  @ApiOperation({ summary: '캣 정보 수정 API' })
  @ApiOkResponse({
    description: 'Id가 일치 하는 캣 정보를 수정 한다.',
    type: Cat,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() requestDto: CatUpdateRequestDto,
    @Res() res: Response,
  ) {
    this.logger.log('update :: ' + id);
    const updatedCat = await this.catsService.updateCat(id, requestDto);
    return res.status(HttpStatus.OK).json(updatedCat);
  }

  @Delete(':id')
  @ApiOperation({ summary: '캣 삭제 API' })
  @ApiNoContentResponse({ description: 'Id가 일치 하는 캣 정보를 삭제 한다.' })
  async delete(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const cat = await this.catsService.deleteCat(id);
    return res.status(HttpStatus.OK).json(cat);
  }
}
