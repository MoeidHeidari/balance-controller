import { Module } from '@nestjs/common';
import { AccountService } from '../servicecs/Account.service';
import { AccountController } from '../../application/controllers/account.controller';
import { AccountRepository } from '../repositories/account.repository';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { HttpResponseService, LoggerService } from '../servicecs';
import { CommonModule } from '../../infrastructure/modules/common';
import { BalanceController } from '../../application/controllers';

@Module({
  imports: [CommonModule],
  controllers: [AccountController, BalanceController],
  providers: [
    {
      provide: 'ACCOUNT',
      useClass: AccountService,
    },
    AccountRepository,
    InMemoryDBService,
    HttpResponseService,
  ],
})
export class AccountModule {}
