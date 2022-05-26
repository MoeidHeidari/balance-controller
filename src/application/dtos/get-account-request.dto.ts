import { IsBoolean, IsDate, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { AccountType } from "../../domain/enums/account-types.enum";
import { Currencies } from "../../domain/enums/currencies.enum";

/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['id'];
export class GetUserAccountRequestDTO {
    /**
    * id of the user
    */
     @IsDefined()
     @IsString()
     @IsNotEmpty()
     id: string;


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