import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['acccount_token', 'id'];
/**
 * CreateAccountReposnseDto
 */
export class CreateAccountReposnseDto {
  /**
   * id of the user
   */
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id of the user',
  })
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
