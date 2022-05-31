import { Injectable } from '@nestjs/common';
import { Mutex } from 'async-mutex';
import { take } from 'rxjs';
import { CreateAccountRequestDTO, GetUserAccountRequestDTO, GetUserAccountResponseDTO } from '../../application/dtos';
import { DepositMoneyRequestDTO } from '../../application/dtos/deposit-money-request.dto';
import { UpdateAccountRequestDTO } from '../../application/dtos/update-account-request.dto';
import { AccountEntity } from '../entities';
import { naiveRound } from '../helpers';
import { AccountRepository } from '../repositories/account.repository';

/**
 * Account service class
 */
@Injectable()
export class AccountService {
  /**
   * Constructs Account service class
   * @param account_repository account repository
   */
  constructor(private readonly account_repository: AccountRepository) {}
  mutex = new Mutex();
  //====================================================================================================================================
  /**
   * Creates a new account
   * @param record Account entity
   * @returns Promise<Observable<AccountEntity | AccountEntity[]>>
   */
  async createNewAccount(record: CreateAccountRequestDTO) {
    const account: AccountEntity = {
      username: record.username,
      name: record.name,
      family: record.family,
      created_at: new Date(),
      updated_at: new Date(),
      balance: 0.0,
      id: '',
    };
    return new Promise(async resolve => {
      (await this.account_repository.create(account)).pipe(take(1)).subscribe(async (data: any) => {
        const response = { id: data.id };
        resolve(response);
      });
    });
  }
  //====================================================================================================================================
  /**
   * Deletes an account
   * @param id id of the user
   * @returns Promise<Observable<void>>
   */
  async deleteAccount(query: GetUserAccountRequestDTO): Promise<void> {
    return new Promise(async resolve => {
      await this.account_repository.delete(query.id);
      resolve();
    });
  }
  //====================================================================================================================================
  /**
   * Gets an account
   * @param id id os the user
   * @returns Promise<Observable<AccountEntity | AccountEntity[]>>
   */
  async getAccount(query: GetUserAccountRequestDTO): Promise<GetUserAccountResponseDTO> {
    return new Promise(async resolve => {
      (await this.account_repository.get(query.id)).pipe(take(1)).subscribe((data: any) => {
        resolve(data);
      });
    });
  }
  //====================================================================================================================================
  /**
   * Updates an account
   * @param record Account entity
   * @returns Promise<Observable<void>>
   */
  async updateAccount(record: UpdateAccountRequestDTO): Promise<GetUserAccountResponseDTO> {
    return new Promise(async resolve => {
      (await this.account_repository.get(record.id)).pipe(take(1)).subscribe(async (data: any) => {
        if (data) {
          if (record.name) data.name = record.name;
          if (record.family) data.family = record.family;
          if (record.currency) data.currencies = record.currency;
          await this.account_repository.update(data);
        }

        resolve(data);
      });
    });
  }
  //====================================================================================================================================
  async depositModeny(id: string, amount: DepositMoneyRequestDTO) {
    const release = await this.mutex.acquire();
    try {
      return new Promise(async resolve => {
        (await this.account_repository.get(id)).pipe(take(1)).subscribe(async (data: any) => {
          (await data).balance += amount.amount;
          (await data).balance = naiveRound((await data).balance, 3);
          await this.account_repository.update(data);
          resolve(data);
        });
      });
    } finally {
      release();
    }
  }
  //====================================================================================================================================
  async widrawMoney(id: string, amount: DepositMoneyRequestDTO) {
    const release = await this.mutex.acquire();
    try {
      return new Promise(async (resolve, rejects) => {
        try {
          (await this.account_repository.get(id)).pipe(take(1)).subscribe(async (data: any) => {
            if (data.balance < amount.amount) {
              rejects(`Insufficient Funds.current balance is: ${data.balance}`);
            } else {
              (await data).balance -= amount.amount;
              (await data).balance = naiveRound((await data).balance, 3);
              await this.account_repository.update(data);
              resolve(data);
            }
          });
        } catch (error) {
          rejects(error);
        }
      });
    } finally {
      release();
    }
  }
}
