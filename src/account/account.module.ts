import { Module } from '@nestjs/common';
import { AccountController } from './controller';
import { AccountRepository } from './repository';
import { AccountService } from './service';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { CommonModule } from '../common';
import { AccountResolver } from './account.resolver';

@Module({
    imports: [CommonModule],
    controllers: [AccountController],
    providers: [
        {
            provide: 'ACCOUNT',
            useClass: AccountService,
        },
        AccountRepository,
        InMemoryDBService,
        AccountResolver,
    ],
})
export class AccountModule {}
