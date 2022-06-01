import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Inject,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
    processHttpError,
    validateDTO,
    validateOutputDTO,
} from '../../common/helpers';
import { HttpResponseException } from '../../http/exceptions';
import { HttpResponse } from '../../http/interface';
import { HttpResponseService } from '../../http/service';
import { LoggerService } from '../../logger';
import {
    CreateAccountRequestDTO,
    DepositMoneyRequestDTO,
    GetUserAccountRequestDTO,
    GetUserAccountResponseDTO,
} from '../dto';
import { ShowBalanceReponseDTO } from '../dto/show-balance-response.dto';
import { UpdateAccountRequestDTO } from '../dto/update-account-request.dto';
import { AccountService } from '../service';

/**
 * Account controller class
 */
@Controller('api/v1/account')
export class AccountController {
    /**
     * Constructs account controller class
     * @param account_service Account service
     */
    constructor(
        @Inject('ACCOUNT') private readonly account_service: AccountService,
        private readonly httpResponseService: HttpResponseService,
        private readonly logger: LoggerService
    ) {}
    //================================================================================================================
    /**
     * This endpoint creates a new account for a given user
     * @param body body of the request
     * @returns return CreateAccountReponseDTO
     */
    @ApiOperation({ summary: 'Entry point for crteate account API' })
    @ApiResponse({
        status: 201,
        description: 'Creates a new account',
        type: String,
    })
    @Header('content-type', 'application/json')
    @Post()
    async createNewAccountHandler(
        @Body() body: CreateAccountRequestDTO
    ): Promise<HttpResponse> {
        try {
            await validateDTO(body, this.httpResponseService);
            const response = await this.account_service.createNewAccount(body);
            await validateOutputDTO(response, this.logger);
            return this.httpResponseService.generate(
                HttpStatus.CREATED,
                response
            );
        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(
                this.httpResponseService.generate(HttpStatus.NOT_FOUND)
            );
        }
    }
    //================================================================================================================
    /**
     * Takes a radious in which we want to invite the customers.
     * @param body radious circle information
     * @returns HTTPReponse
     */
    @ApiOperation({
        summary:
            'Returns back the account associated to a given user with user id',
    })
    @ApiResponse({
        status: 200,
        description: 'Returns back account object of the user',
        type: GetUserAccountResponseDTO,
    })
    @ApiBody({ type: [GetUserAccountRequestDTO] })
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAccount(
        @Query() query: GetUserAccountRequestDTO
    ): Promise<HttpResponse> {
        try {
            await validateDTO(query, this.httpResponseService);
            const response = await this.account_service.getAccount(query);
            if (!response) {
                throw new HttpResponseException(
                    this.httpResponseService.generate(HttpStatus.NOT_FOUND)
                );
            }
            await validateOutputDTO(response, this.logger);
            return this.httpResponseService.generate(HttpStatus.OK, response);
        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(
                this.httpResponseService.generate(
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            );
        }
    }
    //================================================================================================================
    /**
     * Deletes the account of a given user.
     * @param body GetUserAccountRequestDTO
     * @returns HTTPReponse
     */
    @ApiOperation({
        summary: 'Deletes the account associated to a given user with user id',
    })
    @ApiResponse({
        status: 200,
        description: 'Deletes account object of the user',
    })
    @ApiBody({ type: [GetUserAccountRequestDTO] })
    @Delete()
    @HttpCode(HttpStatus.OK)
    async deleteAccount(
        @Query() query: GetUserAccountRequestDTO
    ): Promise<HttpResponse> {
        try {
            await validateDTO(query, this.httpResponseService);
            await this.account_service.deleteAccount(query);
            return this.httpResponseService.generate(HttpStatus.OK);
        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(
                this.httpResponseService.generate(
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            );
        }
    }
    //================================================================================================================
    /**
     * Updates the account of a given user.
     * @param body GetUserAccountRequestDTO
     * @returns HTTPReponse
     */
    @ApiOperation({
        summary: 'Updates the account associated to a given user with user id',
    })
    @ApiResponse({
        status: 200,
        description: 'Updates account object of the user',
        type: CreateAccountRequestDTO,
    })
    @ApiBody({ type: [UpdateAccountRequestDTO] })
    @Put()
    @HttpCode(HttpStatus.OK)
    async updateAccount(
        @Body() body: UpdateAccountRequestDTO
    ): Promise<HttpResponse> {
        try {
            await validateDTO(body, this.httpResponseService);
            const response = await this.account_service.updateAccount(body);
            if (!response) {
                throw new HttpResponseException(
                    this.httpResponseService.generate(HttpStatus.NOT_FOUND)
                );
            }
            await validateOutputDTO(response, this.logger);
            return this.httpResponseService.generate(HttpStatus.OK, response);
        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(
                this.httpResponseService.generate(
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            );
        }
    }
    //================================================================================================================
    /**
     * This endpoint deposits money to user account
     * @param query query of the API
     * @param body body of the API
     * @returns lastest changed acount info
     */
    @ApiOperation({ summary: 'Entry point for crteate account API' })
    @ApiResponse({
        status: 200,
        description: 'Creates a new account',
        type: String,
    })
    @Header('content-type', 'application/json')
    @Post('deposit')
    async depositMoney(
        @Query() query: GetUserAccountRequestDTO,
        @Body() body: DepositMoneyRequestDTO
    ): Promise<HttpResponse> {
        try {
            await validateDTO(query, this.httpResponseService);
            await validateDTO(body, this.httpResponseService);
            const account = await this.account_service.getAccount(query);

            if (!account) {
                throw new HttpResponseException(
                    this.httpResponseService.generate(HttpStatus.NOT_FOUND)
                );
            }
            await validateOutputDTO(account, this.logger);
            const response = await this.account_service.depositModeny(
                account.id,
                body
            );
            await validateOutputDTO(response, this.logger);
            return this.httpResponseService.generate(HttpStatus.OK, response);
        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(
                this.httpResponseService.generate(HttpStatus.NOT_FOUND)
            );
        }
    }
    //================================================================================================================
    /**
     * This endpoint wirdraws money from user account
     * @param query query of the API
     * @param body body of the API
     * @returns lastest changed acount info
     */
    @ApiOperation({ summary: 'Entry point for crteate account API' })
    @ApiResponse({
        status: 200,
        description: 'Creates a new account',
        type: String,
    })
    @Header('content-type', 'application/json')
    @Post('widraw')
    async widraw(
        @Query() query: GetUserAccountRequestDTO,
        @Body() body: DepositMoneyRequestDTO
    ): Promise<HttpResponse> {
        try {
            await validateDTO(query, this.httpResponseService);
            await validateDTO(body, this.httpResponseService);
            const account = await this.account_service.getAccount(query);
            if (!account) {
                throw new HttpResponseException(
                    this.httpResponseService.generate(HttpStatus.NOT_FOUND)
                );
            }
            await validateOutputDTO(account, this.logger);
            return this.account_service
                .widrawMoney(account.id, body)
                .then(async (data) => {
                    await validateOutputDTO(data, this.logger);
                    return this.httpResponseService.generate(
                        HttpStatus.OK,
                        data
                    );
                })
                .catch((error) => {
                    processHttpError(error, this.logger);
                    throw new HttpResponseException(
                        this.httpResponseService.generate(
                            HttpStatus.NOT_ACCEPTABLE,
                            error
                        )
                    );
                });
        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(
                this.httpResponseService.generate(HttpStatus.NOT_FOUND)
            );
        }
    }
    //================================================================================================================
    /**
     * This endpoint show money balance from user account
     * @param query query of the API
     * @param body body of the API
     * @returns lastest changed acount info
     */
    @ApiOperation({ summary: 'Returns back the balance of the account' })
    @ApiResponse({
        status: 200,
        description: 'Returns back the balance of the account',
        type: ShowBalanceReponseDTO,
    })
    @ApiBody({ type: [GetUserAccountRequestDTO] })
    @Get()
    @HttpCode(HttpStatus.OK)
    async showBalance(
        @Query() query: GetUserAccountRequestDTO
    ): Promise<HttpResponse> {
        try {
            await validateDTO(query, this.httpResponseService);
            const account = await this.account_service.getAccount(query);
            if (!account) {
                throw new HttpResponseException(
                    this.httpResponseService.generate(HttpStatus.NOT_FOUND)
                );
            }
            await validateOutputDTO(account, this.logger);
            const balance = { balance: account.balance };
            await validateOutputDTO(balance, this.logger);
            return this.httpResponseService.generate(HttpStatus.OK, balance);
        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(
                this.httpResponseService.generate(
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            );
        }
    }
}
