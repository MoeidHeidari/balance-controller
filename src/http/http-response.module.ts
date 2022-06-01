import { Module } from '@nestjs/common';
import { HttpResponseService } from './service/http-response.service';

@Module({
    providers: [HttpResponseService],
    exports: [HttpResponseService],
})
export class HttpResponseModule {}
