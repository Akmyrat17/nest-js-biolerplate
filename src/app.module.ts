import { Module } from '@nestjs/common';
import { AllModule } from './modules/all.module';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './database/database.module';
import { CacheModule } from '@nestjs/cache-manager';

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
})
export class AppModule {}
