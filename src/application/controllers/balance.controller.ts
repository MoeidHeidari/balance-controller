import { Body, Controller, Get, Header, HttpCode, HttpStatus, Inject, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Public } from "../../domain/decorators";
import { HttpResponseException } from "../../domain/exceptions/http-response.exception";
import { processHttpError, validateDTO, validateOutputDTO } from "../../domain/helpers";
import { HttpResponse } from "../../domain/interfaces";
import { HttpResponseService, LoggerService } from "../../domain/servicecs";
import { AccountService } from "../../domain/servicecs/Account.service";
import { GetUserAccountRequestDTO } from "../dtos";
import { DepositMoneyRequestDTO } from "../dtos/deposit-money-request.dto";
import { ShowBalanceReponseDTO } from "../dtos/show-balance-response.dto";
/**
 * Balance controller class
 */
@Controller('api/v1/balance')
export class BalanceController {


    /**
     * Constructs balance controller class
     * @param account_service Account service
     */
    constructor(
        @Inject('ACCOUNT') private readonly account_service: AccountService,
        private readonly httpResponseService: HttpResponseService,
        private readonly logger: LoggerService) { }
    //================================================================================================================
    /**
     * This endpoint deposits money to user account
     * @param query query of the API
     * @param body body of the API
     * @returns lastest changed acount info
     */
    @ApiOperation({ summary: 'Entry point for crteate account API' })
    @ApiResponse({
        status: 201,
        description: 'Creates a new account',
        type: String,
    })
    @Header('content-type', 'application/json')
    @Post('deposit')
    @Public()
    async depositMoney(@Query() query: GetUserAccountRequestDTO, @Body() body: DepositMoneyRequestDTO): Promise<HttpResponse> {
        try {


            await validateDTO(query, this.httpResponseService);
            await validateDTO(body, this.httpResponseService);
            const account = await this.account_service.getAccount(query);

            if (!account) {
                throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.NOT_FOUND));
            }
            await validateOutputDTO(account, this.logger);
            const response = await this.account_service.depositModeny(account.id, body);
            await validateOutputDTO(response, this.logger);
            return this.httpResponseService.generate(HttpStatus.OK, response);
        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.NOT_FOUND));
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
        status: 201,
        description: 'Creates a new account',
        type: String,
    })
    @Header('content-type', 'application/json')
    @Post('widraw')
    @Public()
    async widraw(@Query() query: GetUserAccountRequestDTO, @Body() body: DepositMoneyRequestDTO): Promise<HttpResponse> {
        try {
            await validateDTO(query, this.httpResponseService);
            await validateDTO(body, this.httpResponseService);
            const account = await this.account_service.getAccount(query);
            if (!account) {
                throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.NOT_FOUND));
            }
            await validateOutputDTO(account, this.logger);
            return this.account_service.widrawMoney(account.id, body).then(async (data) => {
                await validateOutputDTO(data, this.logger);
                return this.httpResponseService.generate(HttpStatus.OK, data);
            }).catch(error => {
                processHttpError(error, this.logger);
                throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.NOT_ACCEPTABLE,error));
            });

        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.NOT_FOUND));
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
    @Public()
    async showBalance(@Query() query: GetUserAccountRequestDTO): Promise<HttpResponse> {
        try {
            await validateDTO(query, this.httpResponseService);
            const account = await this.account_service.getAccount(query);
            if (!account) {
                throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.NOT_FOUND));
            }
            await validateOutputDTO(account, this.logger);
            const balance = { balance: account.balance }
            await validateOutputDTO(balance, this.logger);
            return this.httpResponseService.generate(HttpStatus.OK, balance);
        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
}