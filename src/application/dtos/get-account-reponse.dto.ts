import { IsBoolean, IsDate, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { AccountType } from "../../domain/enums/account-types.enum";
import { Currencies } from "../../domain/enums/currencies.enum";

/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['id','account_type', 'name', 'familty', 'username', 'email', 'currency', 'is_active', 'created_at', 'updated_at', 'token','balance'];
export class GetUserAccountResponseDTO {
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
    @IsOptional()
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
    * is account active
    */
    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
    is_active: boolean;

    /**
    * token of the account
    */
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    token: string;

    /**
    * date of when account had been created
    */
    @IsDefined()
    @IsDate()
    @IsNotEmpty()
    created_at: Date;

    /**
    * date of when account had been updated
    */
    @IsDefined()
    @IsDate()
    @IsNotEmpty()
    updated_at: Date;

    /**
    * balance of the aaount
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