import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
    IsDefined,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Currencies } from '../../common/enums';

/**
 * List of allowed properties in this DTO
 */
const allowedProperties = [
    'id',
    'name',
    'familty',
    'username',
    'currency',
    'created_at',
    'updated_at',
    'token',
    'balance',
];
@ObjectType()
export class GetUserAccountResponseDTO {
    /**
     * id of the user
     */
    @IsDefined()
    @IsString()
    @Field()
    @IsNotEmpty()
    @ApiProperty({
        description: 'id of the user',
    })
    id: string;

    /**
     * name of the user
     */
    @IsDefined()
    @IsString()
    @MaxLength(30)
    @MinLength(3)
    @Field()
    @ApiProperty({
        description: 'name of the user',
    })
    name: string;
    /**
     * familty of the user
     */
    @IsDefined()
    @IsString()
    @Field()
    @MaxLength(30)
    @MinLength(3)
    @ApiProperty({
        description: 'family of the user',
    })
    family: string;
    /**
     * username of the user
     */
    @IsDefined()
    @IsString()
    @MaxLength(30)
    @Field()
    @MinLength(3)
    @ApiProperty({
        description: 'username of the user',
    })
    username: string;
    /**
     * default currency of the account
     */
    @IsDefined()
    @Field()
    @IsNotEmpty()
    @IsEnum(Currencies, { each: true })
    @ApiProperty({
        description: 'currency of the user acount balance',
    })
    currency: Currencies;

    /**
     * date of when account had been created
     */
    @IsDefined()
    @IsDate()
    @Field()
    @IsNotEmpty()
    @ApiProperty({
        description: 'acount created at',
    })
    created_at: Date;

    /**
     * date of when account had been updated
     */
    @IsDefined()
    @IsDate()
    @Field()
    @IsNotEmpty()
    @ApiProperty({
        description: 'account updated at',
    })
    updated_at: Date;

    /**
     * balance of the aaount
     */
    @IsDefined()
    @Field()
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'balance of the user acount',
    })
    balance: number;

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
