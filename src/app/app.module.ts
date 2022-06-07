import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AccountModule } from '../account';
import { configuration, validate } from '../config';
import { LoggerInterceptor } from '../logger';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({driver:ApolloDriver,autoSchemaFile:join(process.cwd(),'src/schema.gql')}),
        AccountModule,
        PrometheusModule.register(),
        ConfigModule.forRoot({
            load: [configuration],
            validate,
            isGlobal: true,
            cache: true,
            expandVariables: true,
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggerInterceptor,
        },
    ],
})
export class AppModule {}
