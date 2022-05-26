import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { AccountType } from "../../domain/enums/account-types.enum";
import { Currencies } from "../../domain/enums/currencies.enum";

/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['id','account_type', 'name', 'familty', 'username', 'email', 'currency'];
export class UpdateAccountRequestDTO {
     /**
    * id of the user
    */
     @IsDefined()
     @IsString()
     @IsNotEmpty()
     id: string;

    /**
    * type of the account
    */
    @IsEnum(AccountType, { each: true })
    account_type: AccountType
    /**
    * name of the user
    */
    @IsDefined()
    @IsString()
    @MaxLength(30)
    @MinLength(3)
    name: string;
    /**
    * familty of the user
    */
    @IsDefined()
    @IsString()
    @MaxLength(30)
    @MinLength(3)
    familty: string;
    /**
    * username of the user
    */
    @IsDefined()
    @IsString()
    @MaxLength(30)
    @MinLength(3)
    username: string;
    /**
    * email of the user
    */
    @IsDefined()
    @IsEmail()
    email: string;
    /**
    * default currency of the account
    */
    @IsDefined()
    @IsNotEmpty()
    @IsEnum(Currencies, { each: true })
    currency: Currencies;

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