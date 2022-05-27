import { INestApplication, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Test, TestingModule } from "@nestjs/testing";
import supertest from "supertest";
import { AppModule } from '../../src/infrastructure/modules/app.module';
import { CREATE_FAKE_ACCOUNT_TEST_CASE_1 } from "../factories/e2e.factories";
describe('acount balance endpoints (e2e)', () => {
    let app: INestApplication;
    let request: ReturnType<typeof supertest>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).setLogger(new Logger()).compile();

        app = module.createNestApplication();
        await app.init();

        const config = new DocumentBuilder()
            .setTitle('Parloa Invitation service')
            .setDescription('A service to Find out should be invited customers list')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);
        request = supertest(app.getHttpServer());
    });
    //=============================================================================================================================
    describe('check service liveness', () => {
        it('should receive status code 404', async () => {
            return await request.get('/').expect(404);
        });
        //........................................................................................................................
        it(CREATE_FAKE_ACCOUNT_TEST_CASE_1.expectation.should, async () => {
            return await request.post('/api/v1/account').send(CREATE_FAKE_ACCOUNT_TEST_CASE_1.date)
            .expect((res)=> expect(JSON.parse(res.text).status).toEqual(CREATE_FAKE_ACCOUNT_TEST_CASE_1.expectation.http.statusCode))
          });
    });
    afterAll(()=>{
        app.close();
    });

});