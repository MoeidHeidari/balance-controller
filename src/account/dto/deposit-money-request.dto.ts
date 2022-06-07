import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['amount'];
@InputType()
export class DepositMoneyRequestDTO {
    /**
     * amount of money to deposit
     */
    @IsDefined()
    @IsNumber()
    @Field()
    @IsNotEmpty()
    @ApiProperty({
        description: 'amount of the user account balance',
    })
    amount: number;

    /**
     * get user DTO constructor
     * @param properties DTO properties
     */
    constructor(properties: any = {}) {
        Object.keys(properties).forEach((key: string) => {
            if (allowedProperties.includes(key))
                this[key as keyof this] = properties[key];
        });
    }
}
