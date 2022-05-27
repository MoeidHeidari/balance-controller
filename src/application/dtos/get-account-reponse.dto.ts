import { IsBoolean, IsDate, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Currencies } from "../../domain/enums/currencies.enum";

/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['id', 'name', 'familty', 'username', 'currency','created_at', 'updated_at', 'token','balance'];
export class GetUserAccountResponseDTO {
    /**
    * id of the user
    */
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id: string;

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
    * default currency of the account
    */
    @IsDefined()
    @IsNotEmpty()
    @IsEnum(Currencies, { each: true })
    currency: Currencies;


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