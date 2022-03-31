import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../constants';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'user',
    host: 'localhost',
    database: 'geodb',
    password: 'password',
    port: '5432',
  }),
};

@Module({ providers: [dbProvider], exports: [dbProvider] })
export class DbModule {}
