import faker from "faker";
import { Currencies } from "../../src/domain/enums/currencies.enum";

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
        should: "return a valid random id",
        http:{
            statusCode:201,
        },
        data:{
            id: "returned valid user id"
        },
        error:{

        }
    }
}