import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Inject, Patch, Post, Put, Query, Req, Res } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Public } from "../../domain/decorators";
import { HttpResponseException } from "../../domain/exceptions/http-response.exception";
import { processHttpError, validateDTO, validateOutputDTO } from "../../domain/helpers";
import { HttpResponse } from "../../domain/interfaces";
import { HttpResponseService, LoggerService } from "../../domain/servicecs";
import { AccountService } from "../../domain/servicecs/Account.service";
import { CreateAccountRequestDTO, GetUserAccountRequestDTO, GetUserAccountResponseDTO } from "../dtos";
import { DepositMoneyRequestDTO } from "../dtos/deposit-money-request.dto";
import { ShowBalanceReponseDTO } from "../dtos/show-balance-response.dto";
import { UpdateAccountRequestDTO } from "../dtos/update-account-request.dto";
/**
 * Account controller class
 */
@Controller('api/v1/account')
export class AccountController {


    /**
     * Constructs account controller class
     * @param account_service Account service
     */
    constructor( @Inject('ACCOUNT') private readonly account_service: AccountService,
        private readonly httpResponseService: HttpResponseService,
        private readonly logger: LoggerService) { }
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
    @Public()
    async createNewAccountHandler(@Body() body: CreateAccountRequestDTO): Promise<HttpResponse> {
        try {
            await validateDTO(body, this.httpResponseService);
            const response = await this.account_service.createNewAccount(body);
            await validateOutputDTO(response, this.logger);
            return this.httpResponseService.generate(HttpStatus.CREATED, response);
        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.NOT_FOUND));
        }

    }
    //================================================================================================================
    /**
    * Takes a radious in which we want to invite the customers.
    * @param body radious circle information
    * @returns HTTPReponse
    */
    @ApiOperation({ summary: 'Returns back the account associated to a given user with user id' })
    @ApiResponse({
        status: 200,
        description: 'Returns back account object of the user',
        type: GetUserAccountResponseDTO,
    })
    @ApiBody({ type: [GetUserAccountRequestDTO] })
    @Get()
    @HttpCode(HttpStatus.OK)
    @Public()
    async getAccount(@Query() query: GetUserAccountRequestDTO): Promise<HttpResponse> {
        try {
            await validateDTO(query, this.httpResponseService);
            const response = await this.account_service.getAccount(query);
            if (!response) {
                throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.NOT_FOUND));
            }
            await validateOutputDTO(response, this.logger);
            return this.httpResponseService.generate(HttpStatus.OK, response);
        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
    //================================================================================================================
    /**
    * Deletes the account of a given user.
    * @param body GetUserAccountRequestDTO
    * @returns HTTPReponse
    */
    @ApiOperation({ summary: 'Deletes the account associated to a given user with user id' })
    @ApiResponse({
        status: 200,
        description: 'Deletes account object of the user'
    })
    @ApiBody({ type: [GetUserAccountRequestDTO] })
    @Delete()
    @HttpCode(HttpStatus.OK)
    @Public()
    async deleteAccount(@Query() query: GetUserAccountRequestDTO): Promise<HttpResponse> {
        try {
            await validateDTO(query, this.httpResponseService);
            await this.account_service.deleteAccount(query);
            return this.httpResponseService.generate(HttpStatus.OK);
        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
    //================================================================================================================
    /**
    * Updates the account of a given user.
    * @param body GetUserAccountRequestDTO
    * @returns HTTPReponse
    */
    @ApiOperation({ summary: 'Updates the account associated to a given user with user id' })
    @ApiResponse({
        status: 200,
        description: 'Updates account object of the user',
        type: CreateAccountRequestDTO
    })
    @ApiBody({ type: [UpdateAccountRequestDTO] })
    @Put()
    @HttpCode(HttpStatus.OK)
    @Public()
    async updateAccount(@Body() body: UpdateAccountRequestDTO): Promise<HttpResponse> {
        try {
            await validateDTO(body, this.httpResponseService);
            const response = await this.account_service.updateAccount(body);
            if (!response) {
                throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.NOT_FOUND));
            }
            await validateOutputDTO(response, this.logger);
            return this.httpResponseService.generate(HttpStatus.OK, response);
        } catch (error) {
            processHttpError(error, this.logger);
            throw new HttpResponseException(this.httpResponseService.generate(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
    
}