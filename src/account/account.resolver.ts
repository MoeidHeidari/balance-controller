
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateAccountReposnseDto, CreateAccountRequestDTO, DepositMoneyRequestDTO, GetUserAccountRequestDTO, GetUserAccountResponseDTO } from './dto';
import { ShowBalanceReponseDTO } from './dto/show-balance-response.dto';
import { UpdateAccountRequestDTO } from './dto/update-account-request.dto';
import { AccountEntity } from './entity/graphql/account.graphql.entity';
import { AccountService } from './service';

@Resolver(of => AccountEntity)
export class AccountResolver {

    constructor(@Inject('ACCOUNT') private readonly accountService:AccountService){}

    /**
     * Return a list of all accounts
     * @returns AccountEntity
     */
    @Query(returns=>[AccountEntity])
    async accounts():Promise<AccountEntity[]>{
        return this.accountService.getAllAccounts();
    }
    //===================================================================================================
    /**
     * updates an existing account object
     * @param update UpdateAccountRequestDTO
     * @returns AccountEntity
     */
    @Query(returns => AccountEntity)
    async update(@Args('update') update:UpdateAccountRequestDTO):Promise<AccountEntity>{
        return this.accountService.updateAccount(update);
    }
    //===================================================================================================
    /**
     * Creates a new account object
     * @param addAccountInput CreateAccountrequestDTO
     * @returns CreateAccountResponseDto
     */
    @Mutation(returns=> CreateAccountReposnseDto)
    async createAccount(@Args('addAccount') addAccountInput:CreateAccountRequestDTO):Promise<CreateAccountReposnseDto>{
        return this.accountService.createNewAccount(addAccountInput);
    }
    //===================================================================================================
    /**
     * Deletes an existing account object
     * @param id GetUserAccountRequestDTO
     * @returns boolean
     */
    @Mutation(returns=> Boolean)
    async deleteAccount(@Args('id') id:GetUserAccountRequestDTO):Promise<boolean>{
        if(this.accountService.deleteAccount(id)) return true;
        else return false;
    }
    //===================================================================================================
    /**
     * deposits an amount on money to the account balance
     * @param id id of the account
     * @param depositInputdata GetUserAccountRequestDTO
     * @returns GetAccountResponseDTO
     */
    @Mutation(returns=>GetUserAccountResponseDTO)
    async depositMoney(@Args('id') id:GetUserAccountRequestDTO,@Args('deposit') depositInputdata:DepositMoneyRequestDTO):Promise<GetUserAccountResponseDTO>{
        return this.accountService.depositModeny(id.id,depositInputdata);
    }
    //===================================================================================================
    /**
     * widraw an amount on money from the account balance
     * @param id id of the account
     * @param depositInputdata GetUserAccountRequestDTO
     * @returns GetAccountResponseDTO
     */
    @Mutation(returns=>GetUserAccountResponseDTO)
    async widrawMoney(@Args('id') id:GetUserAccountRequestDTO,@Args('widraw') depositInputdata:DepositMoneyRequestDTO):Promise<GetUserAccountResponseDTO>{
        return this.accountService.widrawMoney(id.id,depositInputdata);
    }
}
