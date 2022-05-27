import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Currencies } from "../../domain/enums/currencies.enum";

/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['id', 'name', 'familty', 'username', 'email', 'currency'];
export class UpdateAccountRequestDTO {
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
    @IsOptional()
    @IsString()
    @MaxLength(30)
    @MinLength(3)
    name: string;
    /**
    * familty of the user
    */
    @IsOptional()
    @IsString()
    @MaxLength(30)
    @MinLength(3)
    family: string;

    /**
    * default currency of the account
    */
    @IsOptional()
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