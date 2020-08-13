import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '10.1.1.2',
    port: 3306,
    username: 'root',
    password: 'desenv123',
    database: 'nestjs-task',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true
};
