import { IsDefined, IsNotEmpty, IsNumber } from "class-validator";

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