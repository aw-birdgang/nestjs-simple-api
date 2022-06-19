import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {Cat} from "./cat.entity";
import {CatCreateRequestDto} from "./dto/cat-create-request.dto";
import {CatResponseDto} from "./dto/cat-response.dto";
import {isEmpty} from 'src/common/util/is-empty';
import Message from 'src/api/cats/cat.message';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CatUpdateRequestDto} from "./dto/cat-update-request.dto";


@Injectable()
export class CatService {
    constructor(
        @InjectRepository(Cat)
        private catRepository: Repository<Cat>,
    ) {}

    private readonly logger = new Logger(CatService.name);

    async createCat(requestDto: CatCreateRequestDto): Promise<Cat> {
        const cat = this.catRepository.create(Cat.of(requestDto));
        return this.catRepository.save(cat);
    }

    async findAll(): Promise<Cat[]> {
        return this.catRepository.find();
    }

    async findById(id: number): Promise<CatResponseDto> {
        const cat = await this.findCatById(id);
        return new CatResponseDto(cat);
    }

    private async findCatById(id: number): Promise<Cat> {
        const findOneOptions = {
            where: { id: id },
        };
        // @ts-ignore
        const cat = await this.catRepository.findOne(findOneOptions);
        this.logger.log('findCatById :: ' + cat.name, cat.breed, cat.age);

        if (isEmpty(cat) === true) {
            throw new NotFoundException(Message.NOT_FOUND_CAT);
        }
        return cat;
    }

    async updateCat(
        id: number,
        requestDto: CatUpdateRequestDto,
    ): Promise<Cat> {
        const cat = await this.findCatById(id);
        this.logger.log('updateCat :: ' + cat.name, cat.breed, cat.age);

        const { name, breed, age, } = requestDto;
        cat.update(name, breed, age);
        return this.catRepository.save(cat);
    }

    async deleteCat(id: number): Promise<Cat> {
        const cat = await this.findCatById(id);
        this.logger.log('delete :: ' + cat.name, cat.breed, cat.age);
        const result = await this.catRepository.delete(id);
        this.logger.log('result :: ' + result);
        return cat;
    }

}
