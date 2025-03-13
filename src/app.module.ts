import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation.schema';
import { LinksModule } from './links/links.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/data-source';
import { WorkerModule } from './worker/worker.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...AppDataSource.options,
      }),
    }),
    ScheduleModule.forRoot(),
    LinksModule,
    WorkerModule,
  ],
})
export class AppModule {}
