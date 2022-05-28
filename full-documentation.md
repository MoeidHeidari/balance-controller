# Grover monetary transaction

### Full project documentation

This document descibes the structure and design of the project in detail.

version 1.0.0

---

#### features

- [x] monetary transaction service provides seven different REST API to manage user account and monetary transaction also.
  
  - [x] create account
  
  - [x] update account
  
  - [x] read account
  
  - [x] delete account

- [x] balance APIs
  
  - [x] deposit money API
  
  - [x] widraw money API
  
  - [x] show balance API

> **Info**

> you can find a postman collection contains all provided apis inside the root of the project. (/Grover.postman_collection.json)

##### create account

```bash
curl --location --request POST 'http://localhost:8085/api/v1/account' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "moeid",
    "family": "heidari",
    "username":"moeidheidari",
    "currency":"USD"
}'
```

##### example response

```bash
{
    "type": "Success",
    "status": 201,
    "message": "Created",
    "description": "The request has been fulfilled and resulted in a new resource being created",
    "data": {
        "id": "a00616b5-d8dd-48d2-8bf1-d95ccc3cdc11"
    }
}
```

##### get account

```bash
curl --location --request GET 'http://localhost:8085/api/v1/account?id=a00616b5-d8dd-48d2-8bf1-d95ccc3cdc11'
```

##### example response

```bash
{
    "type": "Success",
    "status": 200,
    "message": "OK",
    "description": "The request has succeeded",
    "data": {
        "username": "moeidheidari",
        "name": "moeid",
        "family": "heidari",
        "created_at": "2022-05-28T16:48:18.098Z",
        "updated_at": "2022-05-28T16:48:18.098Z",
        "balance": 0,
        "id": "a00616b5-d8dd-48d2-8bf1-d95ccc3cdc11"
    }
}
```

##### update account

```bash
curl --location --request PUT 'http://localhost:8085/api/v1/account' \
--header 'Content-Type: application/json' \
--data-raw '{

    "family": "updated",
    "name":"update",
    "id":"a00616b5-d8dd-48d2-8bf1-d95ccc3cdc11"
}'
```

##### example reponse

```bash
{
    "type": "Success",
    "status": 200,
    "message": "OK",
    "description": "The request has succeeded",
    "data": {
        "username": "moeidheidari",
        "name": "update",
        "family": "updated",
        "created_at": "2022-05-28T16:48:18.098Z",
        "updated_at": "2022-05-28T16:48:18.098Z",
        "balance": 0,
        "id": "a00616b5-d8dd-48d2-8bf1-d95ccc3cdc11"
    }
}
```

##### deposit

```bash
curl --location --request POST 'http://localhost:8085/api/v1/balance/deposit?id=a00616b5-d8dd-48d2-8bf1-d95ccc3cdc11' \
--header 'Content-Type: application/json' \
--data-raw '{
    "amount":23.098
}'
```

##### example response

```bash
{
    "type": "Success",
    "status": 200,
    "message": "OK",
    "description": "The request has succeeded",
    "data": {
        "username": "moeidheidari",
        "name": "update",
        "family": "updated",
        "created_at": "2022-05-28T16:48:18.098Z",
        "updated_at": "2022-05-28T16:48:18.098Z",
        "balance": 23.098,
        "id": "a00616b5-d8dd-48d2-8bf1-d95ccc3cdc11"
    }
}
```

##### widraw  bash

```bash
curl --location --request POST 'http://localhost:8085/api/v1/balance/widraw?id=a00616b5-d8dd-48d2-8bf1-d95ccc3cdc11' \
--header 'Content-Type: application/json' \
--data-raw '{
    "amount": 0.005
}'
```

##### example response

```bash
{
    "type": "Success",
    "status": 200,
    "message": "OK",
    "description": "The request has succeeded",
    "data": {
        "username": "moeidheidari",
        "name": "update",
        "family": "updated",
        "created_at": "2022-05-28T16:48:18.098Z",
        "updated_at": "2022-05-28T16:48:18.098Z",
        "balance": 23.093,
        "id": "a00616b5-d8dd-48d2-8bf1-d95ccc3cdc11"
    }
}
```

##### ***Note*** : In case we don't have enough balance API will give us such a response.

```bash
{
    "type": "Client Error",
    "status": 406,
    "message": "Not Acceptable",
    "description": "The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request",
    "data": "Insufficient Funds.current balance is: 0"
}
```

##### show balance

```bash
curl --location --request GET 'http://localhost:8085/api/v1/balance?id=a00616b5-d8dd-48d2-8bf1-d95ccc3cdc11'
```

##### example reponse

```bash
{
    "type": "Success",
    "status": 200,
    "message": "OK",
    "description": "The request has succeeded",
    "data": {
        "balance": 23.093
    }
}
```

---

#### Request and response DTOS

create-account-request.dto.ts

```typescript
import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Currencies } from "../../domain/enums/currencies.enum";

/**
 * List of allowed properties in this DTO
 */
const allowedProperties = [ 'name', 'familty', 'username','currency'];
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
            if (allowedProperties.includes(key)) this[key as keyof this] = properties[key];
        });
    }

}
```

create-account-response.dto.ts

```typescript
import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";
/**
 * List of allowed properties in this DTO
 */
const allowedProperties = ['acccount_token','id'];
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
```

deposit-money-request.dto.ts

```typescript
import { ApiProperty } from "@nestjs/swagger";
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
            if (allowedProperties.includes(key)) this[key as keyof this] = properties[key];
        });
    }

}
```

get-account-reponse.dto.ts

```typescript
import { ApiProperty } from "@nestjs/swagger";
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
        description: 'currency of the user acount balance',
      })
    currency: Currencies;


    /**
    * date of when account had been created
    */
    @IsDefined()
    @IsDate()
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
    @IsNotEmpty()
    @ApiProperty({
        description: 'account updated at',
      })
    updated_at: Date;

    /**
    * balance of the aaount
    */
    @IsDefined()
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
            if (allowedProperties.includes(key)) this[key as keyof this] = properties[key];
        });
    }

}
```

get-account-request.dto.ts

```typescript
import { ApiProperty } from "@nestjs/swagger";
import { IsDefined,IsNotEmpty, IsString } from "class-validator";

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
```

show-balance-response.dto.ts

```typescript
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
```

update-account-request.dto.ts

```typescript
import { ApiProperty } from "@nestjs/swagger";
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
     @ApiProperty({
        description: 'id of the user',
      })
     id: string;

    /**
    * name of the user
    */
    @IsOptional()
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
    @IsOptional()
    @IsString()
    @MaxLength(30)
    @MinLength(3)
    @ApiProperty({
        description: 'family of the user',
      })
    family: string;

    /**
    * default currency of the account
    */
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(Currencies, { each: true })
    @ApiProperty({
        description: 'currency of the user acount balance',
      })
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
```

---

## Concurrency & race condition

#### Race condition example

![](/images/concurrency-1.png)



from the picture above we can see that component2 lost some money. Actually it does not have an actual view of the balance after performing it's own update on balance as it is overriding change previously made by component1.

To overcome this problem in this service concurrent operations on transactions are isolated to make sure that only one transaction running at a given time.

![](/images/concurrency-2.png)

#### Solution

1. Have a way to identify when *we are about to change* the balance
2. Let other events wait in line until the change is completed before reading the balance

For this reason I used  an asynx-mutex library that can perform mutex exclusion on a critical path which is account balance in our service.

```typescript
async depositModeny(id: string, amount: DepositMoneyRequestDTO) {
        const release = await this.mutex.acquire()
        try {
            return new Promise(async (resolve) => {
                (await this.account_repository.get(id)).pipe(take(1)).subscribe(async (data: any) => {
                    (await data).balance += amount.amount;
                    (await data).balance=naiveRound((await data).balance,3);
                    (await this.account_repository.update(data));
                    resolve(data);
                })
            });
        } finally {
            release()
        }
    }
```

---

### Database

For this porpuse an in memory databse is used for this service. Application looses the data after closing.

Database: nestjs/in-memory-db version 3.0.3

---

### Entities

account.entity.ts

```typescript
import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface AccountEntity extends InMemoryDBEntity{
    username: string,
    name:string,
    family:string,
    balance?:number;
    created_at?:Date;
    updated_at?:Date
}
```

--- 

### Module dependency structure

![](/images/main-module.png)

![](/images/module-numbers.png)

----

#### Dependencies

```bash
@compodoc/compodoc : ^1.1.19
@nestjs-addons/in-memory-db : ^ 3.0.3
@nestjs/axios : 0.0.7
@nestjs/cli : ^8.2.5
@nestjs/common : ^8.4.5
@nestjs/config : ^2.0.0
@nestjs/core : ^8.4.5
@nestjs/platform-express : ^8.4.5
@nestjs/swagger : ^5.0.8
@nestjs/terminus : ^7.2.0
@types/dotenv-flow : ^3.1.0
@types/express : ^4.17.8
@types/faker : ^5.1.4
@types/morgan : ^1.9.2
@willsoto/nestjs-prometheus : ^4.6.0
ansi-styles : ^6.1.0
async-mutex : ^0.3.2
cache-manager : ^3.6.1
chokidar : ^3.5.3
class-transformer : ^0.3.1
class-validator : ^0.13.2
dotenv : ^8.2.0
dotenv-expand : ^5.1.0
dotenv-flow : ^3.2.0
faker : ^5.1.0
has-flag : ^5.0.1
morgan : ^1.10.0
prom-client : ^14.0.1
ramda : ^0.27.1
reflect-metadata : ^0.1.13
rimraf : ^3.0.2
rxjs : ^7.5.5
skaffold : ^1.0.11
start-server-webpack-plugin : ^2.2.5
supports-color : ^9.2.2
swagger-ui-express : ^4.4.0
```

---

#### Account module

![](/images/account-module.png)

---

### Test cases

- [x] account-balance.factory.ts
  
  ```typescript
  import faker, { datatype } from "faker";
  import { Currencies } from "../../../src/domain/enums/currencies.enum"
  ////////////////////////////////////////e2e test cases////////////////////////////////////////////////////////////
  function getRandomCurrency<T>(anEnum: T): T[keyof T] {
      const enumValues = Object.keys(anEnum)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
      const randomIndex = Math.floor(Math.random() * enumValues.length)
      const randomEnumValue = enumValues[randomIndex]
      return randomEnumValue;
    }
  /**
   * checks if service can create an account with valid data
   */
  export const CREATE_FAKE_ACCOUNT_TEST_CASE_1 = {
      date: {
          name: faker.name.firstName(),
          family: faker.name.lastName(),
          username: faker.internet.userName(),
          currency: getRandomCurrency(Currencies),
      },
      expectation: {
          should: "return a valid random id"
      }
  }
  //===============================================================================================================
  /**
   * Check if service returns an error 
   */
  export const CREATE_FAKE_ACCOUNT_TEST_CASE_2 = {
      date: {
      family: faker.name.lastName(),
      username: faker.internet.userName(),
      currency:getRandomCurrency(Currencies),
      },
      expectation: {
          should: "error, name must be provided"
      }
  }
  //===============================================================================================================
  /**
   * Check if service returns an error 
   */
  export const CREATE_FAKE_ACCOUNT_TEST_CASE_3 = {
      name: faker.name.firstName(),
      username: faker.internet.userName(),
      currency:getRandomCurrency(Currencies),
      expectation: {
          should: "error, family must be provided"
      }
  }
  //===============================================================================================================
  /**
   * Check if service returns an error 
   */
  export const CREATE_FAKE_ACCOUNT_TEST_CASE_4 = {
      name: faker.name.firstName(),
      family: faker.name.lastName(),
      currency:getRandomCurrency(Currencies),
      expectation: {
          should: "error, username must be provided"
      }
  }
  //===============================================================================================================
  /**
   * Check if service returns an error 
   */
  export const CREATE_FAKE_ACCOUNT_TEST_CASE_5 = {
      name: faker.name.firstName(),
      username: faker.internet.userName(),
      family: faker.name.lastName(),
      expectation: {
          should: "error, currency must be provided"
      }
  }
  //===============================================================================================================
  /**
   * Check if service returns an error 
   */
  export const CREATE_FAKE_ACCOUNT_TEST_CASE_6 = {
      name: datatype.number(2000),
      username: faker.internet.userName(),
      family: faker.name.lastName(),
      currency:getRandomCurrency(Currencies),
      expectation: {
          should: "error, name must has string type"
      }
  }
  //===============================================================================================================
  /**
   * Check if service returns an error 
   */
  export const CREATE_FAKE_ACCOUNT_TEST_CASE_7 = {
      name: faker.name.firstName(),
      username: datatype.number(2000),
      family: faker.name.lastName(),
      currency:getRandomCurrency(Currencies),
      expectation: {
          should: "error, username must has string type"
      }
  }
  //===============================================================================================================
  /**
   * Check if service returns an error 
   */
  export const CREATE_FAKE_ACCOUNT_TEST_CASE_8 = {
      name: faker.name.firstName(),
      username: faker.internet.userName(),
      family: faker.name.lastName(),
      currency: datatype.string(10),
      expectation: {
          should: " error currency should be valid"
      }
  }
  ////////////////////////////////////////integration test cases//////////////////////////////////////////////////
  export const DELETE_FAKE_ACCOUNT_TEST_CASE_1 = {
      account: {
          name: faker.name.firstName(),
          family: faker.name.lastName(),
          username: faker.internet.userName(),
          currency:getRandomCurrency(Currencies),
          expectation: {
              should: "return a valid random id"
          }
      },
      delete: {
          id: "returned id from previous operation"
      },
      expectation: {
          should: "delete the account with provided id"
      }
  }
  //===============================================================================================================
  export const DELETE_FAKE_ACCOUNT_TEST_CASE_2 = {
      account: {
          name: faker.name.firstName(),
          family: faker.name.lastName(),
          username: faker.internet.userName(),
          currency:getRandomCurrency(Currencies),
          expectation: {
              should: "return a valid random id"
          }
      },
      delete: {
          id: datatype.string(11)
      },
      expectation: {
          should: "not record found for the given user id"
      }
  }
  //===============================================================================================================
  export const UPDATE_FAKE_ACCOUNT_TEST_CASE_1 = {
      account: {
          name: faker.name.firstName(),
          family: faker.name.lastName(),
          username: faker.internet.userName(),
          currency:getRandomCurrency(Currencies),
          expectation: {
              should: "return a valid random id"
          }
      },
      update: {
          id: "returned id from previous operation",
          name: "updated",
          family: "updated",
          username: "updated",
          currency: "USD",
      },
      expectation: {
          should: "updated the account with provided id and information"
      }
  }
  //================================================================================================================
  export const UPDATE_FAKE_ACCOUNT_TEST_CASE_2 = {
      account: {
          name: faker.name.firstName(),
          family: faker.name.lastName(),
          username: faker.internet.userName(),
          currency:getRandomCurrency(Currencies),
          expectation: {
              should: "return a valid random id"
          }
      },
      update: {
          id: datatype.string(11),
          name: "updated",
          family: "updated",
          username: "updated",
          currency: "USD",
      },
      expectation: {
          should: "return not found user id"
      }
  }
  //================================================================================================================
  export const GET_FAKE_ACCOUNT_TEST_CASE_1 = {
      account: {
          name: faker.name.firstName(),
          family: faker.name.lastName(),
          username: faker.internet.userName(),
          currency:getRandomCurrency(Currencies),
          expectation: {
              should: "return a valid random id"
          }
      },
      update: {
          id: "returned id from previous operation"
      },
      expectation: {
          should: "return account associated with the given id"
      }
  }
  //================================================================================================================
  export const GET_FAKE_ACCOUNT_TEST_CASE_2 = {
      account: {
          name: faker.name.firstName(),
          family: faker.name.lastName(),
          username: faker.internet.userName(),
          currency:getRandomCurrency(Currencies),
          expectation: {
              should: "return a valid random id"
          }
      },
      update: {
          id: datatype.string(11)
      },
      expectation: {
          should: "return not found user id"
      }
  }
  //================================================================================================================
  export const DEPOSIT_FAKE_MONEY_TEST_CASE_1 = {
      account: {
          name: faker.name.firstName(),
          family: faker.name.lastName(),
          username: faker.internet.userName(),
          currency:getRandomCurrency(Currencies),
          expectation: {
              should: "return a valid random id"
          }
      },
      query: {
          id: "returned id from previous operation"
      },
      body: {
          amount: 10
      },
      expectation: {
          should: "balance should become 10.000"
      }
  }
  //================================================================================================================
  export const DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_2 = {
      account: {
          name: faker.name.firstName(),
          family: faker.name.lastName(),
          username: faker.internet.userName(),
          currency:getRandomCurrency(Currencies),
          expectation: {
              should: "return a valid random id"
          }
      },
      deposit: {
          query: {
              id: "returned id from previous operation"
          },
          body: {
              amount: 10
          }
      },
      widraw: {
          query: {
              id: "returned id from previous operation"
          },
          body: {
              amount: 8.25
          }
      },
      final:{
          amount:1.75
      },
      expectation: {
          should: "balance should become 1.75"
      }
  }
  //================================================================================================================
  export const DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3 = {
      account: {
          name: faker.name.firstName(),
          family: faker.name.lastName(),
          username: faker.internet.userName(),
          currency:getRandomCurrency(Currencies),
          expectation: {
              should: "return a valid random id"
          }
      },
      deposit: {
          query: {
              id: "returned id from previous operation"
          },
          body: {
              amount: 10
          },
          final:{
              amount:10
          }
      },
      widraw: {
          query: {
              id: "returned id from previous operation"
          },
          body: {
              amount: 8.25
          },
          final:{
              amount:1.75
          }
      },
      deposit2: {
          query: {
              id: "returned id from previous operation"
          },
          body: {
              amount: 4.35
          },
          final:{
              amount:6.1
          }
      },
      deposit3: {
          query: {
              id: "returned id from previous operation"
          },
          body: {
              amount: 9.63
          },
          final:{
              amount:15.73
          }
      },
      deposit4: {
          query: {
              id: "returned id from previous operation"
          },
          body: {
              amount: 18.458
          },
          final:{
              amount:34.188
          }
      },
      widraw2: {
          query: {
              id: "returned id from previous operation"
          },
          body: {
              amount: 5.23
          }
      },
      final:{
          amount:28.958
      },
      expectation: {
          should: "balance should become 28.956"
      }
  }
  //================================================================================================================
  export const WIDRAW_FAKE_MONEY_TEST_CASE_1 = {
      account: {
          name: faker.name.firstName(),
          family: faker.name.lastName(),
          username: faker.internet.userName(),
          currency:getRandomCurrency(Currencies),
          expectation: {
              should: "return a valid random id"
          }
      },
      widraw: {
          query: {
              id: "returned id from previous operation"
          },
          body: {
              amount: 8.25
          }
      },
      final:{
          amount:0
      },
      expectation: {
          should: "should return insufficient funds error as our balance befor widraw is 0"
      }
  }
  ```

- [x] e2e.factory.ts
  
  ```typescript
  import faker from "faker";
  import { Currencies } from "../../../src/domain/enums/currencies.enum";
  
  ////////////////////////////////////////e2e test cases////////////////////////////////////////////////////////////
  /**
   * checks if service can create an account with valid data
   */
  export const E_2_E_CREATE_FAKE_ACCOUNT_TEST_CASE_1 = {
      date: {
          name: faker.name.firstName(),
          family: faker.name.lastName(),
          username: faker.internet.userName(),
          currency: randomEnumValue(Currencies),
      },
      expectation: {
          should: "return a valid random id",
          http: {
              statusCode: 201,
          },
          data: {
              id: "returned valid user id"
          },
          error: {
  
          }
      }
  }
  //==============================================================================================
  export const E_2_E_CREATE_FAKE_ACCOUNT_TEST_CASE_2 = {
      date: {
          family: faker.name.lastName(),
          username: faker.internet.userName(),
          currency: randomEnumValue(Currencies),
      },
      expectation: {
          should: "return 400 error",
          http: {
              statusCode: 400,
          },
          error: {
              message: "Bad request"
          }
      }
  }
  //==============================================================================================
  export const E_2_E_DELETE_FAKE_ACCOUNT_TEST_CASE_1 = {
      date: {
          id: "dgdfgdfg"
      },
      expectation: {
          should: "return 400 HTTP status code",
          http: {
              statusCode: 400,
          },
          error: {
  
          }
      }
  
  }
  //==============================================================================================
  export const E_2_E_DEPOSIT_FAKE_MONEY_TEST_CASE_1 = {
      data: {
          quey: {
              id: "dgdfgdfg"
          },
          body: {
              amount: 10
          }
      },
      expectation: {
          should: "return 200 HTTP status code",
          http: {
              statusCode: 200,
          },
          error: {
  
          },
          date: {
              balance: 10
          }
      }
  }
  //==============================================================================================
  export const E_2_E_WIDRAW_FAKE_MONEY_TEST_CASE_1 = {
      data: {
          quey: {
              id: "dgdfgdfg"
          },
          body: {
              amount: 10
          }
      },
      expectation: {
          should: "return 406 HTTP status code",
          http: {
              statusCode: 406,
          },
          error: {
  
          }
      }
  }
  //==============================================================================================
  export const E_2_E_UPDATE_FAKE_MONEY_TEST_CASE_1 = {
      data: {
          id: "",
          name: "updated",
          family: "updated",
          currency: randomEnumValue(Currencies),
      },
      expectation: {
          should: "return 200 HTTP status code",
          http: {
              statusCode: 200,
          },
          error: {
  
          }
      }
  }
  ```

---

#### K8s manifest files

grover-namespace.yaml

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: grover
  labels:
    name: grover
```

grover-configmap.yaml

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: grover-config
  namespace: grover
data:
  NODE_PORT: "8085"
  NODE_ENV: "production"
```

grover-deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    io.kompose.service: grover
  name: grover
  namespace: grover
spec:
  replicas: 1
  selector:
    matchLabels:
      io.kompose.service: grover
  strategy: {}
  template:
    metadata:
      labels:
        io.kompose.service: grover
    spec:
      containers:
      - env:
        - name: NODE_ENV
          valueFrom:
            configMapKeyRef:
              name: grover-config
              key: NODE_ENV
        - name: NODE_PORT
          valueFrom:
            configMapKeyRef:
              name: grover-config
              key: NODE_PORT
        image: registry.gitlab.com/moeidtopcoder/grover:latest
        imagePullPolicy: "Always"
        name: grover
        ports:
        - containerPort: 8077
        resources: 
      restartPolicy: Always
      serviceAccountName: ""
status: {}
```

grover-service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    io.kompose.service: grover
  name: grover
  namespace: grover
spec:
  ports:
  - name: "8077"
    port: 8077
    targetPort: 8077
  selector:
    io.kompose.service: grover
status:
  loadBalancer: {}
```

---

#### Skaffold (Continues Deployment on kubernetes cluster)

skaffold.yaml

```yaml
apiVersion: skaffold/v2beta13
kind: Config
build:
  local:
    useBuildkit: true
  artifacts:
  - image: grover
deploy:
  helm:
    releases:
    - name: app
      chartPath: ./k8s
      wait: false
      useHelmSecrets: true
      valuesFiles:
      - ./k8s/values.yaml
      - ./k8s/secrets.yaml
      artifactOverrides:
        image: grover
      imageStrategy:
        helm: {}

portForward:
 - resourceType: service
   resourceName: app
   port: 8085
   localPort: 8086
```

---

#### start.sh script

start.sh

```bash
#!/bin/bash

set -Eeuo pipefail
trap cleanup SIGINT SIGTERM ERR EXIT

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)

usage() {
  cat << EOF # remove the space between << and EOF, this is due to web plugin issue
Usage: $(basename "${BASH_SOURCE[0]}") [-h] [-build_docker] [-build_and_run_docker] [-stop_docker] [-run_app] [-run_test] [-run_lint] [-deploy_on_kubernetes] 


This script helps you to runn the application in different forms. below you can get the full list of available options.

Available options:

-h, --help              Print this help and exit
-build_docker           Build the docker image called "grover:latest"
-build_and_run_docker   Build the docker image and run on local machine
-stop_docker            Stop running docker container named "grover"
-run_app                Run application with npm in usual way for development
-run_test               Run npm test
-run_lint               Run npm lint
-generate_doc           Generate the code documentation
-deploy_on_kubernetes   you need to have a kubernetes cluster already up and running on the machine.
EOF
  exit
}
#=============================================================================================================================================================================
cleanup() {
  trap - SIGINT SIGTERM ERR EXIT
  # script cleanup here
}
#=============================================================================================================================================================================
setup_colors() {
  if [[ -t 2 ]] && [[ -z "${NO_COLOR-}" ]] && [[ "${TERM-}" != "dumb" ]]; then
    NOFORMAT='\033[0m' RED='\033[0;31m' GREEN='\033[0;32m' ORANGE='\033[0;33m' BLUE='\033[0;34m' PURPLE='\033[0;35m' CYAN='\033[0;36m' YELLOW='\033[1;33m'
  else
    NOFORMAT='' RED='' GREEN='' ORANGE='' BLUE='' PURPLE='' CYAN='' YELLOW=''
  fi
}
#=============================================================================================================================================================================
msg() {
  echo >&2 -e "${1-}"
}
#=============================================================================================================================================================================
die() {
  local msg=$1
  local code=${2-1} # default exit status 1
  msg "$msg"
  exit "$code"
}
#=============================================================================================================================================================================
checkIfHelmIsInstalled()
{
    echo "Checking Helm ..."
if command which helm > /dev/null; then
        echo "Helm is not installed! :("
        echo "Installing Helm ..."
        curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
        sudo chmod 700 get_helm.sh
        ./get_helm.sh
        echo "Checking secrets helm plugin..."
        helm plugin install https://github.com/jkroepke/helm-secrets --version v3.12.0 || true
        echo "helm is installed, skipping..."
    else
        echo "Helm is installed :) ..."
        sleep 1
fi
}
checkIfSkaffoldIsInstalled()
{
    echo "Checking Skaffold ..."
if command which helm > /dev; then
        echo "Skaffold is not installed! :("
        echo "Installing Skaffold ..."
        curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && \
        sudo install skaffold /usr/local/bin/
        echo "Skaffold is installed, skipping..."
    else
        echo "Helm is installed :) ..."
        sleep 1
fi
}
#=============================================================================================================================================================================
runOnKubernetes(){
    checkIfHelmIsInstalled
    checkIfSkaffoldIsInstalled
    cd ..
    make
}
#=============================================================================================================================================================================
runTheApp()
{
    cd ..
    npm install
    npm start
}
#=============================================================================================================================================================================
runTheTests()
{
    cd ..
    npm install
    npm test
}
#=============================================================================================================================================================================
runtheLint()
{
    cd ..
    npm install
    npm run lint
}
#=============================================================================================================================================================================
runDockerImage(){
   cd ..
    docker-compose up -d
}
#=============================================================================================================================================================================
stopDockerImage(){
   cd ..
    docker-compose down
}
#=============================================================================================================================================================================
generateDoc(){
    cd ..
    npm install
    npm run doc
}
#=============================================================================================================================================================================
buildDockerImage()
{
    echo "Checking Docker ..."
if [[ $(which docker) && $(docker --version) ]]; then
        echo "Docker is installed :) ..."
        sleep 1

    else
        echo "Docker is not installed! :("
        echo "Installing Docker ..."
        sudo apt install docker.io || true
        sudo usermod -aG docker $USER
        newgrp docker 
fi

    echo "Checking docker-compose ..."
if [[ $(which docker-compose) && $(docker-compose --version) ]]; then
        echo "docker-compose is installed :) ..."
        sleep 1
    else
        echo "docker-compose is not installed! :("
        echo "Installing Docker ..."
        sudo apt install docker-compose || true      
fi
cd ..
docker-compose build
}
init(){
  sudo chmod 666 /var/run/docker.sock
}
#=============================================================================================================================================================================
parse_params() {
  # default values of variables set from params

  while :; do
    case "${1-}" in
    -h | --help) usage ;;
    -build_docker) buildDockerImage ;;
    -build_and_run_docker) runDockerImage ;;
    -stop_docker) stopDockerImage ;;
    -run_app) runTheApp ;;
    -run_test) runTheTests ;;
    -run_lint) runtheLint ;;
    -generate_doc) generateDoc;;
    -deploy_on_kubernetes) runOnKubernetes ;;
    -v | --verbose) set -x ;;
    --no-color) NO_COLOR=1 ;;
    -?*) die "Unknown option: $1" ;;
    *) break ;;
    esac
    shift
  done

  args=("$@")

  return 0
}
#=============================================================================================================================================================================
setup_colors
init
parse_params "$@"
#=============================================================================================================================================================================
```

---

### Bootstrap and docker-entrypoint

```bash
#!/usr/bin/env sh
set -e

export NODE_ENV=${CURRENT_ENV_:-prod}

__boostrap="/usr/local/bin/bootstrap"

if [ "$#" -eq 0 ] || [ "${1#-}" != "$1" ]; then
  exec "${__boostrap}" "$@"
# If no arguments passed, run the main executable
elif [ -z "$1" ]; then
  exec "${__boostrap}"
fi
# else default to run whatever the user wanted like "bash" or "sh"
exec "$@"
```
