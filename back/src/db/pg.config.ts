import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

export const dbConfigFactory = async (configService: ConfigService) => {
  return new Pool({
    user: configService.get('POSTGRES_USER'),
    host: configService.get('POSTGRES_HOST') || 'postgres',
    database: configService.get('POSTGRES_DB'),
    password: configService.get('POSTGRES_PASSWORD'),
    port: configService.get('POSTGRES_LOCAL_PORT') || 5432,
  });
};
