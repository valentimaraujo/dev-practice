import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');
const envConfig = process.env;

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: envConfig.RDS_HOSTNAME || dbConfig.host,
    port: envConfig.RDS_PORT || dbConfig.port,
    username: envConfig.RDS_USERNAME || dbConfig.username,
    password: envConfig.RDS_PASSWORD || dbConfig.password,
    database: envConfig.RDS_DB_NAME || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: envConfig.TYPEORM_SYNC || dbConfig.synchronize
};
