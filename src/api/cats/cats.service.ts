import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {Cat} from "./cat.entity";
import {CreateCatDto} from "./dto/create-cat.dto";
import {ResponseCatDto} from "./dto/response-cat.dto";
import {isEmpty} from 'src/common/util/is-empty';
import Message from 'src/api/cats/cat.message';


@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    private readonly logger = new Logger(CatsService.name);

    async createCat(requestDto: CreateCatDto): Promise<Cat> {
        const cat = Cat.of(requestDto);
        this.cats.push(cat);
        return cat;
    }

    async findAll() {
        return this.cats;
    }

    async findByName(name: String): Promise<ResponseCatDto> {
        const cat = await this.findCatByName(name);
        return new ResponseCatDto(cat);
    }

    private async findCatByName(name: String): Promise<Cat> {
        let result;
        await this.cats.forEach(cat => {
            console.log(cat);
            if (cat.name == name) {
                result = cat;
                return cat;
            }
        });
        if (isEmpty(result) === true) {
            throw new NotFoundException(Message.NOT_FOUND_TOKEN);
        }
        return result;
    }

}
