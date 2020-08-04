import {Injectable} from '@nestjs/common';
import {InjectQueue} from "@nestjs/bull";
import {Queue} from "bull";

@Injectable()
export class TasksService {
    constructor(@InjectQueue('coletas') private readonly coletasQueue: Queue) {
    }

    async createProcess(): Promise<object> {
        const arrName = ['calculo_formulas', 'coletas', 'calculo_indicadores', 'notificacoes_coletas'];
        const rnd = Math.floor(Math.random() * 4);
        const jobName = arrName[rnd];
        const {id} = await this.coletasQueue.add(jobName, {
            roteiro: new Date(),
            agenda: jobName,
            usuario: 1705,
        });

        return {jobId: id, jobName, rnd};
    }
}
