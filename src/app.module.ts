import { Module } from '@nestjs/common';
import { AllModule } from './modules/all.module';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/http/exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    DataBaseModule,
    AllModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
