import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface AccountEntity extends InMemoryDBEntity {
  username: string;
  name: string;
  family: string;
  balance?: number;
  created_at?: Date;
  updated_at?: Date;
}
