import {Body, Controller, Get, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {Response} from 'express';
import {CreateCatDto} from './dto/create-cat.dto';
import {CatsService} from './cats.service';
import {ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Cat} from "./cat.entity";
import {ResponseCatDto} from "./dto/response-cat.dto";
import {instanceToPlain} from "class-transformer";

@Controller('cats')
@ApiTags('Cats API')
export class CatsController {
    constructor(
        private readonly catsService: CatsService,
    ) {}

    @Post()
    @ApiOperation({ summary: '캣 을 생성 API', description: '캣 을 생성 한다.' })
    @ApiCreatedResponse({ description: '캣 을 생성 한다.', type: Cat })
    async create(
        @Body() createCatDto: CreateCatDto,
        @Res() res: Response,
    ) {
        const cat = await this.catsService.createCat(createCatDto);
        return res.status(HttpStatus.CREATED).json(cat);
    }

    @Get()
    @ApiOperation({ summary: '모든 캣 을 조회 API' })
    @ApiOkResponse({ description: '모든 캣 을 조회 한다.', type: Cat })
    async findAll(@Res() res: Response) {
        let cats = await this.catsService.findAll();
        return res.status(HttpStatus.OK).json(cats);
    }

    @Get(':name')
    @ApiOperation({ summary: '캣 정보 조회 API' })
    @ApiOkResponse({
        description: 'name 이 일치 하는 캣 정보를 조회 한다.',
        type: ResponseCatDto,
    })
    async findByName(
        @Param('name') name: string,
        @Res() res: Response,
    ) {
        const responseDto = await this.catsService.findByName(name);
        return res.status(HttpStatus.OK).json(instanceToPlain(responseDto));
    }

}
