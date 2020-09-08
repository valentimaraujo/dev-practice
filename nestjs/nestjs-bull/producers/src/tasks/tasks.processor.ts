import {Process, Processor} from "@nestjs/bull";
import {Logger} from "@nestjs/common";
import {Job} from "bull";

@Processor('coletas')
export class TasksProcessor {
    private readonly logger = new Logger(TasksProcessor.name);

    @Process('coletas')
    async handleColetas(job: Job): Promise<void> {
        this.logger.debug('Start Coletas(' +  job.id + ')...');
        await this.sleep(10000);
        this.logger.debug(job.data);
        this.logger.debug("######### COLETAS COMPLETED(" +  job.id + ")\n\n");
    }

    @Process('calculo_formulas')
    handleCalculoFormulas(job: Job): void {
        this.logger.debug('Start Calculo Formulas(' +  job.id + ')...');
        this.logger.debug(job.data);
        this.logger.debug("Calculo Formulas completed(" +  job.id + ")\n\n");
    }

    @Process('indicadores')
    handleIndicadores(job: Job): void {
        this.logger.debug('Start Indicadores(' +  job.id + ')...');
        this.logger.debug(job.data);
        this.logger.debug("Indicadores completed(" +  job.id + ")\n\n");
    }

    @Process('notificacoes_coletas')
    async handleNotificacoesColetas(job: Job): Promise<void> {
        this.logger.debug('Start Notificacoes Coletas(' +  job.id + ')...');
        await this.sleep(10000);
        this.logger.debug(job.data);
        this.logger.debug("######### NOTIFICACOES COLETAS COMPLETED(" +  job.id + ")\n\n");
    }

    @Process('calculo_indicadores')
    handleCalculoIndicadores(job: Job): void {
        this.logger.debug('Start Calculo Indicadores(' +  job.id + ')...');
        this.logger.debug(job.data);
        this.logger.debug("Calculo Indicadores completed(" +  job.id + ")\n\n");
    }

    sleep(ms): Promise<boolean> {
        return new Promise((resolve) => {
            console.log('=======>>>>' + ms);
            setTimeout(resolve, ms);
            console.log('XXXXXXX>>>>' + ms);
        });
    }
}
