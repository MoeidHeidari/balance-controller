import { Injectable } from "@nestjs/common";
import { Observable, of, take } from "rxjs";
import { CreateAccountRequestDTO, GetUserAccountRequestDTO, GetUserAccountResponseDTO } from "../../application/dtos";
import { ShowBalanceReponseDTO } from "../../application/dtos/show-balance-response.dto";
import { UpdateAccountRequestDTO } from "../../application/dtos/update-account-request.dto";
import { AccountEntity } from "../entities";
import { generateToken } from "../helpers";
import { AccountRepository } from "../repositories/account.repository";

/**
 * Account service class
 */
@Injectable()
export class AccountService {
    /**
     * Constructs Account service class
     * @param account_repository account repository
     */
    constructor(private readonly account_repository: AccountRepository) { }
    //====================================================================================================================================
    /**
     * Creates a new account
     * @param record Account entity
     * @returns Promise<Observable<AccountEntity | AccountEntity[]>>
     */
    async createNewAccount(record: CreateAccountRequestDTO) {
        const account: AccountEntity = {
            account_type: record.account_type,
            username: record.username,
            first_name: record.name,
            last_name: record.familty,
            email: record.email,
            token: await generateToken(20),
            is_active: false,
            created_at: new Date(),
            updated_at: new Date(),
            balance:0.0,
            id: ""
        }
        return new Promise(async (resolve) => {
            (await this.account_repository.create(account)).pipe(take(1)).subscribe(async (data: any) => {
                const response = { acccount_token: data.token, id: data.id }
                resolve(response);
            })
        })



    }
    //====================================================================================================================================
    /**
     * Deletes an account
     * @param id id of the user
     * @returns Promise<Observable<void>>
     */
    async deleteAccount(query: GetUserAccountRequestDTO):Promise<void> {
        return new Promise(async (resolve) => {
            (await this.account_repository.delete(query.id));
            resolve();
        })
    }
    //====================================================================================================================================
    /**
     * Gets an account
     * @param id id os the user
     * @returns Promise<Observable<AccountEntity | AccountEntity[]>>
     */
    async getAccount(query: GetUserAccountRequestDTO): Promise<GetUserAccountResponseDTO> {
        return new Promise(async (resolve) => {
            (await this.account_repository.get(query.id)).pipe(take(1)).subscribe((data: any) => {
                resolve(data);
            })
        })
    }
    //====================================================================================================================================
    /**
     * Updates an account
     * @param record Account entity
     * @returns Promise<Observable<void>>
     */
    async updateAccount(record: UpdateAccountRequestDTO): Promise<GetUserAccountResponseDTO> {
        const account: AccountEntity = {
            account_type: record.account_type,
            username: record?.username,
            first_name: record?.name,
            last_name: record?.familty,
            email: record?.email,
            updated_at: new Date(),
            id: record.id,
        }
        return new Promise(async (resolve) => {
            (await this.account_repository.update(account));
            (await this.account_repository.get(account.id)).pipe(take(1)).subscribe((data: any) => {
                resolve(data);
            })
        })
    }
    //====================================================================================================================================
    
}