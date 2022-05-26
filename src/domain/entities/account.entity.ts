import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";
import { AccountType } from "../enums/account-types.enum";

export interface AccountEntity extends InMemoryDBEntity{
    account_type: AccountType,
    username: string,
    first_name:string,
    last_name:string,
    email:string,
    token?:string,
    is_active?:boolean,
    balance?:number;
    created_at?:Date;
    updated_at?:Date
}