import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountEntity } from '../../src/domain/entities';
import { AccountRepository } from '../../src/domain/repositories/account.repository';
import { AccountService, HttpResponseService } from '../../src/domain/servicecs';
import { CommonModule } from '../../src/infrastructure/modules/common';
import { AccountController, BalanceController } from '../../src/application/controllers';
import { Logger } from '@nestjs/common';
import {
  CREATE_FAKE_ACCOUNT_TEST_CASE_1,
  DELETE_FAKE_ACCOUNT_TEST_CASE_1,
  DELETE_FAKE_ACCOUNT_TEST_CASE_2,
  DEPOSIT_FAKE_MONEY_TEST_CASE_1,
  DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_2,
  DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3,
  GET_FAKE_ACCOUNT_TEST_CASE_1,
  UPDATE_FAKE_ACCOUNT_TEST_CASE_1,
  UPDATE_FAKE_ACCOUNT_TEST_CASE_2,
  WIDRAW_FAKE_MONEY_TEST_CASE_1,
} from './facories/account-balance.factory';
import {
  CreateAccountReposnseDto,
  GetUserAccountRequestDTO,
  GetUserAccountResponseDTO,
} from '../../src/application/dtos';
import { UpdateAccountRequestDTO } from '../../src/application/dtos/update-account-request.dto';
import { DepositMoneyRequestDTO } from '../../src/application/dtos/deposit-money-request.dto';
describe('acount service tests', () => {
  const inMemoryService = new InMemoryDBService<AccountEntity>({ featureName: 'account' });
  const accountRepository = new AccountRepository(inMemoryService);
  let accountService = new AccountService(accountRepository);
  let testModule: TestingModule;

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'ACCOUNT',
          useClass: AccountService,
        },
        AccountRepository,
        InMemoryDBService,
        HttpResponseService,
        AccountService,
      ],
      imports: [CommonModule],
      controllers: [AccountController, BalanceController],
    })
      .setLogger(new Logger())
      .compile();
    accountService = testModule.get<AccountService>(AccountService);
  });

  //=================================================================================================================================
  describe('account service status', () => {
    it('should be defined', () => {
      expect(accountService).toBeDefined();
    });
    //------------------------------------------------------------------------------------------------------------------------------
    it(CREATE_FAKE_ACCOUNT_TEST_CASE_1.expectation.should, async () => {
      const result = await accountService.createNewAccount(CREATE_FAKE_ACCOUNT_TEST_CASE_1.date);
      const data = new CreateAccountReposnseDto(result);
      expect(data.id).toBeDefined();
    });
    //------------------------------------------------------------------------------------------------------------------------------
    it(GET_FAKE_ACCOUNT_TEST_CASE_1.expectation.should, async () => {
      const result = await accountService.createNewAccount(GET_FAKE_ACCOUNT_TEST_CASE_1.account);
      const data = new CreateAccountReposnseDto(result);
      const account = await accountService.getAccount(data);
      expect(account.id).toBeDefined();
    });
    //------------------------------------------------------------------------------------------------------------------------------
    it(DELETE_FAKE_ACCOUNT_TEST_CASE_1.expectation.should, async () => {
      const result = await accountService.deleteAccount(DELETE_FAKE_ACCOUNT_TEST_CASE_1.delete);
      const data = new CreateAccountReposnseDto(result);
      const account = await accountService.getAccount(data);
      expect(account).not.toBeDefined();
    });
    //------------------------------------------------------------------------------------------------------------------------------
    it(DELETE_FAKE_ACCOUNT_TEST_CASE_1.expectation.should, async () => {
      const result = await accountService.deleteAccount(DELETE_FAKE_ACCOUNT_TEST_CASE_1.delete);
      const data = new CreateAccountReposnseDto(result);
      const account = await accountService.getAccount(data);
      expect(account).not.toBeDefined();
    });
    //------------------------------------------------------------------------------------------------------------------------------
    it(DELETE_FAKE_ACCOUNT_TEST_CASE_2.expectation.should, async () => {
      const result = await accountService.deleteAccount(DELETE_FAKE_ACCOUNT_TEST_CASE_2.delete);
      const data = new CreateAccountReposnseDto(result);
      expect(data).toMatchObject({});
    });
    //------------------------------------------------------------------------------------------------------------------------------
    it(UPDATE_FAKE_ACCOUNT_TEST_CASE_1.expectation.should, async () => {
      const result = await accountService.createNewAccount(UPDATE_FAKE_ACCOUNT_TEST_CASE_1.account);
      const data = new CreateAccountReposnseDto(result);
      const account = await accountService.getAccount(data);
      UPDATE_FAKE_ACCOUNT_TEST_CASE_1.update.id = account.id;
      const accountupdate = new UpdateAccountRequestDTO(UPDATE_FAKE_ACCOUNT_TEST_CASE_1.update);
      const updatedResult = await accountService.updateAccount(accountupdate);
      expect(updatedResult.name).toEqual(UPDATE_FAKE_ACCOUNT_TEST_CASE_1.update.name);
    });
    //------------------------------------------------------------------------------------------------------------------------------
    it(UPDATE_FAKE_ACCOUNT_TEST_CASE_2.expectation.should, async () => {
      const result = await accountService.createNewAccount(UPDATE_FAKE_ACCOUNT_TEST_CASE_2.account);
      const data = new CreateAccountReposnseDto(result);
      const account = await accountService.getAccount(data);
      UPDATE_FAKE_ACCOUNT_TEST_CASE_1.update.id = account.id;
      const accountupdate = new UpdateAccountRequestDTO(UPDATE_FAKE_ACCOUNT_TEST_CASE_2.update);
      const updatedResult = await accountService.updateAccount(accountupdate);
      expect(updatedResult).not.toBeDefined();
    });
    //------------------------------------------------------------------------------------------------------------------------------
    it(DEPOSIT_FAKE_MONEY_TEST_CASE_1.expectation.should, async () => {
      const result = await accountService.createNewAccount(DEPOSIT_FAKE_MONEY_TEST_CASE_1.account);
      const account = new CreateAccountReposnseDto(result);
      const depositBody = new DepositMoneyRequestDTO(DEPOSIT_FAKE_MONEY_TEST_CASE_1.body);
      const depositQuery = new GetUserAccountRequestDTO(DEPOSIT_FAKE_MONEY_TEST_CASE_1.query);
      depositQuery.id = account.id;
      const deposit = await accountService.depositModeny(depositQuery.id, depositBody);
      const depositResult = new GetUserAccountResponseDTO(deposit);
      expect(depositResult.balance).toEqual(DEPOSIT_FAKE_MONEY_TEST_CASE_1.body.amount);
    });
    //------------------------------------------------------------------------------------------------------------------------------
    it(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_2.expectation.should, async () => {
      const result = await accountService.createNewAccount(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_2.account);
      const account = new CreateAccountReposnseDto(result);
      const depositBody = new DepositMoneyRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_2.deposit.body);
      const depositQuery = new GetUserAccountRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_2.deposit.query);
      depositQuery.id = account.id;
      const deposit = await accountService.depositModeny(depositQuery.id, depositBody);
      const depositResult = new GetUserAccountResponseDTO(deposit);
      expect(depositResult.balance).toEqual(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_2.deposit.body.amount);
      const widrawBody = new DepositMoneyRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_2.widraw.body);
      const widrawQuery = new GetUserAccountRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_2.widraw.query);
      widrawQuery.id = account.id;
      const widraw = await accountService.widrawMoney(widrawQuery.id, widrawBody);
      const widrawResult = new GetUserAccountResponseDTO(widraw);
      expect(widrawResult.balance).toEqual(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_2.final.amount);
    });
    //------------------------------------------------------------------------------------------------------------------------------
    it(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.expectation.should, async () => {
      //............make fresh account...............
      const result = await accountService.createNewAccount(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.account);
      const account = new CreateAccountReposnseDto(result);
      const depositBody = new DepositMoneyRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.deposit.body);
      const depositQuery = new GetUserAccountRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.deposit.query);
      depositQuery.id = account.id;
      //............deposit...............
      const deposit = await accountService.depositModeny(depositQuery.id, depositBody);
      const depositResult = new GetUserAccountResponseDTO(deposit);
      expect(depositResult.balance).toEqual(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.deposit.final.amount);
      //............widraw...............
      const widrawBody = new DepositMoneyRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.widraw.body);
      const widrawQuery = new GetUserAccountRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.widraw.query);
      widrawQuery.id = account.id;
      const widraw = await accountService.widrawMoney(widrawQuery.id, widrawBody);
      const widrawResult = new GetUserAccountResponseDTO(widraw);
      expect(widrawResult.balance).toEqual(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.widraw.final.amount);
      //............second deposit...............
      const deposit2Body = new DepositMoneyRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.deposit2.body);
      const deposit2Query = new GetUserAccountRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.deposit2.query);
      deposit2Query.id = account.id;
      const deposit2 = await accountService.depositModeny(deposit2Query.id, deposit2Body);
      const deposit2Result = new GetUserAccountResponseDTO(deposit2);
      expect(deposit2Result.balance).toEqual(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.deposit2.final.amount);
      //............third deposit...............
      const deposit3Body = new DepositMoneyRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.deposit3.body);
      const deposit3Query = new GetUserAccountRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.deposit3.query);
      deposit3Query.id = account.id;
      const deposit3 = await accountService.depositModeny(deposit3Query.id, deposit3Body);
      const deposit3Result = new GetUserAccountResponseDTO(deposit3);
      expect(deposit3Result.balance).toEqual(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.deposit3.final.amount);
      //............furth deposit...............
      const deposit4Body = new DepositMoneyRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.deposit4.body);
      const deposit4Query = new GetUserAccountRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.deposit4.query);
      deposit4Query.id = account.id;
      const deposit4 = await accountService.depositModeny(deposit4Query.id, deposit4Body);
      const deposit4Result = new GetUserAccountResponseDTO(deposit4);
      expect(deposit4Result.balance).toEqual(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.deposit4.final.amount);
      //............second widraw...............
      const widraw2Body = new DepositMoneyRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.widraw2.body);
      const widraw2Query = new GetUserAccountRequestDTO(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.widraw2.query);
      widraw2Query.id = account.id;
      const widraw2 = await accountService.widrawMoney(widraw2Query.id, widraw2Body);
      const widraw2Result = new GetUserAccountResponseDTO(widraw2);
      expect(widraw2Result.balance).toEqual(DEPOSIT_WIDRAW_FAKE_MONEY_TEST_CASE_3.final.amount);
    });
    //------------------------------------------------------------------------------------------------------------------------------
    it(WIDRAW_FAKE_MONEY_TEST_CASE_1.expectation.should, async () => {
      //............make fresh account...............
      const result = await accountService.createNewAccount(WIDRAW_FAKE_MONEY_TEST_CASE_1.account);
      const account = new CreateAccountReposnseDto(result);
      //............widraw...............
      const widrawBody = new DepositMoneyRequestDTO(WIDRAW_FAKE_MONEY_TEST_CASE_1.widraw.body);
      const widrawQuery = new GetUserAccountRequestDTO(WIDRAW_FAKE_MONEY_TEST_CASE_1.widraw.query);
      widrawQuery.id = account.id;
      try {
        await accountService.widrawMoney(widrawQuery.id, widrawBody);
      } catch (error) {
        expect(error).toBeDefined();
      }
      const createdAccount = await accountService.getAccount(account);
      expect(createdAccount.balance).toEqual(WIDRAW_FAKE_MONEY_TEST_CASE_1.final.amount);
    });
  });
  //=================================================================================================================================
  afterAll(() => {
    try {
      process.nextTick(() => {});
    } catch (err) {
      return err;
    }
  });
});
