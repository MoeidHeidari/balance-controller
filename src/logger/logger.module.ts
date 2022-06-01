import { Module } from '@nestjs/common';
import { LoggerService } from './service';

@Module({
    providers: [LoggerService, String],
    exports: [LoggerService],
})
export class LoggerModule {}
