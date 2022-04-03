import { Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { Pool } from 'pg';
import { DB_CONNECTION } from 'src/constants';
import { dbConfigFactory } from './pg.config';
import { GeoDataRepository } from './pg.repository';

@Module({
  providers: [
    {
      provide: DB_CONNECTION,
      inject: [ConfigService],
      useFactory: dbConfigFactory,
    },
    GeoDataRepository,
  ],
  exports: [GeoDataRepository],
})
export class DbModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  onApplicationShutdown(signal?: string) {
    console.log('Shutting down on signal ', signal);
    const db = this.moduleRef.get(DB_CONNECTION) as Pool;
    return db.end();
  }
}
