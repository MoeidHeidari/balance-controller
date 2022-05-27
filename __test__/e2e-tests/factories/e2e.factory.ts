import faker from "faker";
import { Currencies } from "../../../src/domain/enums/currencies.enum";

////////////////////////////////////////e2e test cases////////////////////////////////////////////////////////////
const randomEnumValue = (enumeration: any) => {
    const values = Object.keys(enumeration);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return enumeration[enumKey];
}
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