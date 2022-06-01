import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import supertest from 'supertest';
import {
    E_2_E_CREATE_FAKE_ACCOUNT_TEST_CASE_1,
    E_2_E_CREATE_FAKE_ACCOUNT_TEST_CASE_2,
    E_2_E_DELETE_FAKE_ACCOUNT_TEST_CASE_1,
    E_2_E_DEPOSIT_FAKE_MONEY_TEST_CASE_1,
    E_2_E_UPDATE_FAKE_MONEY_TEST_CASE_1,
    E_2_E_WIDRAW_FAKE_MONEY_TEST_CASE_1,
} from './factories/e2e.factory';
describe('acount balance endpoints (e2e)', () => {
    let app: INestApplication;
    let request: ReturnType<typeof supertest>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .setLogger(new Logger())
            .compile();
        app = module.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                disableErrorMessages: false,
            })
        );
        await app.init();
        const config = new DocumentBuilder()
            .setTitle('Transaction service')
            .setDescription(
                'A service to controll the mony transaction of a user'
            )
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);
        request = supertest(app.getHttpServer());
    });
    //=============================================================================================================================
    describe('check service liveness', () => {
        it('should receive status code 200', async () => {
            return await request.get('/').expect(200);
        });
    });
    describe('HTTP error tests', () => {
        it(
            E_2_E_CREATE_FAKE_ACCOUNT_TEST_CASE_2.expectation.should,
            async () => {
                await request
                    .post('/api/v1/account')
                    .send(E_2_E_CREATE_FAKE_ACCOUNT_TEST_CASE_2.date)
                    .expect(
                        E_2_E_CREATE_FAKE_ACCOUNT_TEST_CASE_2.expectation.http
                            .statusCode
                    );
            }
        );
        //........................................................................................................................
        it(
            E_2_E_DELETE_FAKE_ACCOUNT_TEST_CASE_1.expectation.should,
            async () => {
                await request
                    .post('/api/v1/account')
                    .send(E_2_E_DELETE_FAKE_ACCOUNT_TEST_CASE_1.date)
                    .expect(
                        E_2_E_DELETE_FAKE_ACCOUNT_TEST_CASE_1.expectation.http
                            .statusCode
                    );
            }
        );
        //........................................................................................................................
        it(E_2_E_WIDRAW_FAKE_MONEY_TEST_CASE_1.expectation.should, async () => {
            const result = await request
                .post('/api/v1/account')
                .send(E_2_E_CREATE_FAKE_ACCOUNT_TEST_CASE_1.date);
            E_2_E_WIDRAW_FAKE_MONEY_TEST_CASE_1.data.quey.id =
                result.body.data.id;
            const widrawResult = await request
                .post('/api/v1/account/widraw')
                .query(E_2_E_WIDRAW_FAKE_MONEY_TEST_CASE_1.data.quey)
                .send(E_2_E_WIDRAW_FAKE_MONEY_TEST_CASE_1.data.body);
            expect(widrawResult.statusCode).toEqual(
                E_2_E_WIDRAW_FAKE_MONEY_TEST_CASE_1.expectation.http.statusCode
            );
        });
    });
    describe('HTTP ok tests', () => {
        it(
            E_2_E_CREATE_FAKE_ACCOUNT_TEST_CASE_1.expectation.should,
            async () => {
                await request
                    .post('/api/v1/account')
                    .send(E_2_E_CREATE_FAKE_ACCOUNT_TEST_CASE_1.date)
                    .expect(
                        E_2_E_CREATE_FAKE_ACCOUNT_TEST_CASE_1.expectation.http
                            .statusCode
                    );
            }
        );
        //........................................................................................................................
        it(
            E_2_E_DEPOSIT_FAKE_MONEY_TEST_CASE_1.expectation.should,
            async () => {
                const result = await request
                    .post('/api/v1/account')
                    .send(E_2_E_CREATE_FAKE_ACCOUNT_TEST_CASE_1.date);
                E_2_E_DEPOSIT_FAKE_MONEY_TEST_CASE_1.data.quey.id =
                    result.body.data.id;
                const depositResult = await request
                    .post('/api/v1/account/deposit')
                    .query(E_2_E_DEPOSIT_FAKE_MONEY_TEST_CASE_1.data.quey)
                    .send(E_2_E_DEPOSIT_FAKE_MONEY_TEST_CASE_1.data.body);
                expect(depositResult.body.data.balance).toEqual(
                    E_2_E_DEPOSIT_FAKE_MONEY_TEST_CASE_1.expectation.date
                        .balance
                );
            }
        );
        //........................................................................................................................
        it(
            E_2_E_DEPOSIT_FAKE_MONEY_TEST_CASE_1.expectation.should,
            async () => {
                const result = await request
                    .post('/api/v1/account')
                    .send(E_2_E_CREATE_FAKE_ACCOUNT_TEST_CASE_1.date);
                E_2_E_UPDATE_FAKE_MONEY_TEST_CASE_1.data.id =
                    result.body.data.id;
                const updateResult = await request
                    .put('/api/v1/account')
                    .send(E_2_E_UPDATE_FAKE_MONEY_TEST_CASE_1.data);
                expect(updateResult.body.data.name).toEqual(
                    E_2_E_UPDATE_FAKE_MONEY_TEST_CASE_1.data.name
                );
                expect(updateResult.body.data.family).toEqual(
                    E_2_E_UPDATE_FAKE_MONEY_TEST_CASE_1.data.family
                );
            }
        );
    });
    afterAll(() => {
        app.close();
    });
});
