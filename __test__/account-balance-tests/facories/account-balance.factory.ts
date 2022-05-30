import faker, { datatype } from 'faker';
import { Currencies } from '../../../src/domain/enums/currencies.enum';
////////////////////////////////////////e2e test cases////////////////////////////////////////////////////////////
function getRandomCurrency<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
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
    should: 'return a valid random id',
  },
};
//===============================================================================================================
/**
 * Check if service returns an error
 */
export const CREATE_FAKE_ACCOUNT_TEST_CASE_2 = {
  date: {
    family: faker.name.lastName(),
    username: faker.internet.userName(),
    currency: getRandomCurrency(Currencies),
  },
  expectation: {
    should: 'error, name must be provided',
  },
};
//===============================================================================================================
/**
 * Check if service returns an error
 */
export const CREATE_FAKE_ACCOUNT_TEST_CASE_3 = {
  name: faker.name.firstName(),
  username: faker.internet.userName(),
  currency: getRandomCurrency(Currencies),
  expectation: {
    should: 'error, family must be provided',
  },
};
//===============================================================================================================
/**
 * Check if service returns an error
 */
export const CREATE_FAKE_ACCOUNT_TEST_CASE_4 = {
  name: faker.name.firstName(),
  family: faker.name.lastName(),
  currency: getRandomCurrency(Currencies),
  expectation: {
    should: 'error, username must be provided',
  },
};
//===============================================================================================================
/**
 * Check if service returns an error
 */
export const CREATE_FAKE_ACCOUNT_TEST_CASE_5 = {
  name: faker.name.firstName(),
  username: faker.internet.userName(),
  family: faker.name.lastName(),
  expectation: {
    should: 'error, currency must be provided',
  },
};
//===============================================================================================================
/**
 * Check if service returns an error
 */
export const CREATE_FAKE_ACCOUNT_TEST_CASE_6 = {
  name: datatype.number(2000),
  username: faker.internet.userName(),
  family: faker.name.lastName(),
  currency: getRandomCurrency(Currencies),
  expectation: {
    should: 'error, name must has string type',
  },
};
//===============================================================================================================
/**
 * Check if service returns an error
 */
export const CREATE_FAKE_ACCOUNT_TEST_CASE_7 = {
  name: faker.name.firstName(),
  username: datatype.number(2000),
  family: faker.name.lastName(),
  currency: getRandomCurrency(Currencies),
  expectation: {
    should: 'error, username must has string type',
  },
};
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
    should: ' error currency should be valid',
  },
};
////////////////////////////////////////integration test cases//////////////////////////////////////////////////
export const DELETE_FAKE_ACCOUNT_TEST_CASE_1 = {
  account: {
    name: faker.name.firstName(),
    family: faker.name.lastName(),
    username: faker.internet.userName(),
    currency: getRandomCurrency(Currencies),
    expectation: {
      should: 'return a valid random id',
    },
  },
  delete: {
    id: 'returned id from previous operation',
  },
  expectation: {
    should: 'delete the account with provided id',
  },
};
//===============================================================================================================
export const DELETE_FAKE_ACCOUNT_TEST_CASE_2 = {
  account: {
    name: faker.name.firstName(),
    family: faker.name.lastName(),
    username: faker.internet.userName(),
    currency: getRandomCurrency(Currencies),
    expectation: {
      should: 'return a valid random id',
    },
  },
  delete: {
    id: datatype.string(11),
  },
  expectation: {
    should: 'not record found for the given user id',
  },
};
//===============================================================================================================
export const UPDATE_FAKE_ACCOUNT_TEST_CASE_1 = {
  account: {
    name: faker.name.firstName(),
    family: faker.name.lastName(),
    username: faker.internet.userName(),
    currency: getRandomCurrency(Currencies),
    expectation: {
      should: 'return a valid random id',
    },
  },
  update: {
    id: 'returned id from previous operation',
    name: 'updated',
    family: 'updated',
    username: 'updated',
    currency: 'USD',
  },
  expectation: {
    should: 'updated the account with provided id and information',
  },
};
//================================================================================================================
export const UPDATE_FAKE_ACCOUNT_TEST_CASE_2 = {
  account: {
    name: faker.name.firstName(),
    family: faker.name.lastName(),
    username: faker.internet.userName(),
    currency: getRandomCurrency(Currencies),
    expectation: {
      should: 'return a valid random id',
    },
  },
  update: {
    id: datatype.string(11),
    name: 'updated',
    family: 'updated',
    username: 'updated',
    currency: 'USD',
  },
  expectation: {
    should: 'return not found user id',
  },
};
//================================================================================================================
export const GET_FAKE_ACCOUNT_TEST_CASE_1 = {
  account: {
    name: faker.name.firstName(),
    family: faker.name.lastName(),
    username: faker.internet.userName(),
    currency: getRandomCurrency(Currencies),
    expectation: {
      should: 'return a valid random id',
    },
  },
  update: {
    id: 'returned id from previous operation',
  },
  expectation: {
    should: 'return account associated with the given id',
  },
};
//================================================================================================================
export const GET_FAKE_ACCOUNT_TEST_CASE_2 = {
  account: {
    name: faker.name.firstName(),
    family: faker.name.lastName(),
    username: faker.internet.userName(),
    currency: getRandomCurrency(Currencies),
    expectation: {
      should: 'return a valid random id',
    },
  },
  update: {
    id: datatype.string(11),
  },
  expectation: {
    should: 'return not found user id',
  },
};
//================================================================================================================
export const DEPOSIT_FAKE_MONEY_TEST_CASE_1 = {
  account: {
    name: faker.name.firstName(),
    family: faker.name.lastName(),
    username: faker.internet.userName(),
    currency: getRandomCurrency(Currencies),
    expectation: {
      should: 'return a valid random id',
    },
  },
  query: {
    id: 'returned id from previous operation',
  },
  body: {
    amount: 10,
  },
  expectation: {
    should: 'balance should become 10.000',
  },
};
//================================================================================================================
export const DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_2 = {
  account: {
    name: faker.name.firstName(),
    family: faker.name.lastName(),
    username: faker.internet.userName(),
    currency: getRandomCurrency(Currencies),
    expectation: {
      should: 'return a valid random id',
    },
  },
  deposit: {
    query: {
      id: 'returned id from previous operation',
    },
    body: {
      amount: 10,
    },
  },
  widraw: {
    query: {
      id: 'returned id from previous operation',
    },
    body: {
      amount: 8.25,
    },
  },
  final: {
    amount: 1.75,
  },
  expectation: {
    should: 'balance should become 1.75',
  },
};
//================================================================================================================
export const DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3 = {
  account: {
    name: faker.name.firstName(),
    family: faker.name.lastName(),
    username: faker.internet.userName(),
    currency: getRandomCurrency(Currencies),
    expectation: {
      should: 'return a valid random id',
    },
  },
  deposit: {
    query: {
      id: 'returned id from previous operation',
    },
    body: {
      amount: 10,
    },
    final: {
      amount: 10,
    },
  },
  widraw: {
    query: {
      id: 'returned id from previous operation',
    },
    body: {
      amount: 8.25,
    },
    final: {
      amount: 1.75,
    },
  },
  deposit2: {
    query: {
      id: 'returned id from previous operation',
    },
    body: {
      amount: 4.35,
    },
    final: {
      amount: 6.1,
    },
  },
  deposit3: {
    query: {
      id: 'returned id from previous operation',
    },
    body: {
      amount: 9.63,
    },
    final: {
      amount: 15.73,
    },
  },
  deposit4: {
    query: {
      id: 'returned id from previous operation',
    },
    body: {
      amount: 18.458,
    },
    final: {
      amount: 34.188,
    },
  },
  widraw2: {
    query: {
      id: 'returned id from previous operation',
    },
    body: {
      amount: 5.23,
    },
  },
  final: {
    amount: 28.958,
  },
  expectation: {
    should: 'balance should become 28.956',
  },
};
//================================================================================================================
export const WIDRAW_FAKE_MONEY_TEST_CASE_1 = {
  account: {
    name: faker.name.firstName(),
    family: faker.name.lastName(),
    username: faker.internet.userName(),
    currency: getRandomCurrency(Currencies),
    expectation: {
      should: 'return a valid random id',
    },
  },
  widraw: {
    query: {
      id: 'returned id from previous operation',
    },
    body: {
      amount: 8.25,
    },
  },
  final: {
    amount: 0,
  },
  expectation: {
    should: 'should return insufficient funds error as our balance befor widraw is 0',
  },
};
