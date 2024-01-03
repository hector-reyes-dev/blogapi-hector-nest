import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import database from '../config/database.config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof database>) => {
        const { connection, user, pass, dbName, host } = configService;
        const uri = `${connection}://${host}`;

        return { user, pass, dbName, uri };
      },
      inject: [database.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
