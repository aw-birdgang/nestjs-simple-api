import { Module } from '@nestjs/common';
import { CatsController } from './api/cats/cats.controller';
import { CatsService } from './api/cats/cats.service';
import { CatsModule } from './api/cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
