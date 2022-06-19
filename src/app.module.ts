import {Module} from '@nestjs/common';
import {CatModule} from './api/cats/cat.module';
import {PostgresqlModule} from "./database/postgresql.module";

@Module({
  imports: [
    PostgresqlModule,
    CatModule,
  ],
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: CacheInterceptor,
  //   },
  // ],
})
export class AppModule {}
