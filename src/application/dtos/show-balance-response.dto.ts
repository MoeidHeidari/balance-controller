import { IsBoolean, IsDate, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { AccountType } from "../../domain/enums/account-types.enum";
import { Currencies } from "../../domain/enums/currencies.enum";

/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['balance'];
export class ShowBalanceReponseDTO {
    /**
    * Current Balance of the account
    */
     @IsDefined()
     @IsNumber()
     @IsNotEmpty()
     balance: number;


    /**
    * get user DTO constructor
    * @param properties DTO properties
    */
    constructor(properties: any = {}) {
        Object.keys(properties).forEach((key: string) => {
            if (allowedProperties.includes(key)) this[key as keyof this] = properties[key];
        });
    }

}