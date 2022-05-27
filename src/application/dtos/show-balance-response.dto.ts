import { ApiProperty } from "@nestjs/swagger";
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
     @ApiProperty({
        description: 'balance of the user account',
      })
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