import { Module } from '@nestjs/common';
import { LoggerService } from '../../servicecs/common';

@Module({
  providers: [LoggerService, String],
  exports: [LoggerService],
})
export class LoggerModule {}
