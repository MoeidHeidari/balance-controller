import { Module } from '@nestjs/common';
import { HttpResponseModule } from '../http';
import { LoggerModule } from '../logger';

@Module({
    imports: [HttpResponseModule, LoggerModule],
    exports: [HttpResponseModule, LoggerModule],
})
export class CommonModule {}
