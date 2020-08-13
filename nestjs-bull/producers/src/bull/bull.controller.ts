import {Controller, Get} from '@nestjs/common';

@Controller('bull')
export class BullController {
    @Get('/dashboard')
    showDashboard() {}
}
