import {MiddlewareConsumer, Module} from '@nestjs/common';
import {BullModule} from '@nestjs/bull';
import {TasksController} from './tasks/tasks.controller';
import {TasksService} from './tasks/tasks.service';
import {TasksProcessor} from "./tasks/tasks.processor";
import { BullController } from './bull/bull.controller';
import { UI as bullUI } from 'bull-board';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'coletas',
            limiter: {
                max: 1000,
                duration: 5000
            },
            redis: {
                host: '127.0.0.1',
                port: 6379
            }
        }),
    ],
    controllers: [TasksController, BullController],
    providers: [TasksService, TasksProcessor],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(bullUI)
            .forRoutes('bull/dashboard');
    }
}
