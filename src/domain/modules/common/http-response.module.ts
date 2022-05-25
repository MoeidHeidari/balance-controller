import { Module } from '@nestjs/common';
import { HttpResponseService } from '../../servicecs/common';

@Module({
  providers: [HttpResponseService],
  exports: [HttpResponseService],
})
export class HttpResponseModule {}
