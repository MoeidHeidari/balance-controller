import { Module } from '@nestjs/common';
import { AccountController } from './controller';
import { AccountRepository } from './repository';
import { AccountService } from './service';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { CommonModule } from '../common';

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
    ],
})
export class AccountModule {}
