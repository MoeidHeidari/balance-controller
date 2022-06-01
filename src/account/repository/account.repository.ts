import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccountEntity } from '../entity';

/**
 * Account repository
 */
@Injectable()
export class AccountRepository {
    /**
     * Constructs account repository class
     * @param accountService account in memory db service
     */
    constructor(
        private readonly accountService: InMemoryDBService<AccountEntity>
    ) {}
    //=======================================================================================================
    /**
     * Creates a new account inside inMemoryDB
     * @param record Account entity
     * @returns Promise<Observable<AccountEntity | AccountEntity[]>>
     */
    async create(
        record: AccountEntity
    ): Promise<Observable<AccountEntity | AccountEntity[]>> {
        return this.accountService.createAsync(record);
    }
    //=======================================================================================================
    /**
     * Deletes an account inside inMemoryDb
     * @param id id of the user
     * @returns Promise<Observable<void>>
     */
    async delete(id: string): Promise<Observable<void>> {
        return this.accountService.deleteAsync(id);
    }
    //=======================================================================================================
    /**
     * Gets an account record from InMemoryDb
     * @param id id os the user
     * @returns Promise<Observable<AccountEntity | AccountEntity[]>>
     */
    async get(
        id: string
    ): Promise<Observable<AccountEntity | AccountEntity[]>> {
        return this.accountService.getAsync(id);
    }
    //=======================================================================================================
    /**
     * Updates an account inside inMemoryDB
     * @param record Account entity
     * @returns Promise<Observable<void>>
     */
    async update(record: AccountEntity): Promise<Observable<void>> {
        return this.accountService.updateAsync(record);
    }
    //=======================================================================================================
}
