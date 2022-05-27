import { IsDefined, IsNotEmpty, IsNumber } from "class-validator";

/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['amount'];
export class DepositMoneyRequestDTO {
    /**
    * amount of money to deposit
    */
     @IsDefined()
     @IsNumber()
     @IsNotEmpty()
     amount: number;


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