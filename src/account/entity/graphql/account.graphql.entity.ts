import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AccountEntity {
    @Field()
    username: string;
    @Field()
    name: string;
    @Field()
    family: string;
    @Field()
    balance?: number;
    @Field()
    created_at?: Date;
    @Field()
    updated_at?: Date;
}
