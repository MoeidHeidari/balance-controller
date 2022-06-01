import { ApiProperty } from '@nestjs/swagger';
import {
    IsDefined,
    IsEnum,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Currencies } from '../../common/enums';

/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['name', 'familty', 'username', 'currency'];
export class CreateAccountRequestDTO {
    /**
     * name of the user
     */
    @IsDefined()
    @IsString()
    @MaxLength(30)
    @MinLength(3)
    @ApiProperty({
        description: 'name of the user',
    })
    name: string;
    /**
     * familty of the user
     */
    @IsDefined()
    @IsString()
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
    @MinLength(3)
    @ApiProperty({
        description: 'username of the user',
    })
    username: string;

    /**
     * default currency of the account
     */
    @IsDefined()
    @IsNotEmpty()
    @IsEnum(Currencies, { each: true })
    @ApiProperty({
        description: 'currency of the user account',
    })
    currency: Currencies;

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
