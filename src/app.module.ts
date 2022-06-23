import { Module } from '@nestjs/common';
import { CatModule } from './api/cats/cat.module';
import { PostgresqlModule } from './database/postgresql.module';
import {HealthModule} from "./api/health/health.module";

@Module({
  imports: [PostgresqlModule, CatModule, HealthModule,],
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: CacheInterceptor,
  //   },
  // ],
})
export class AppModule {}
