import {Module} from '@nestjs/common';
import {CatModule} from './api/cats/cat.module';
import {PostgresqlModule} from "./database/postgresql.module";

@Module({
  imports: [
    PostgresqlModule,
    CatModule,
  ],
})
export class AppModule {}
