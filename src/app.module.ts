import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import database from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database],
      isGlobal: true,
    }),
    DatabaseModule,
    PostsModule,
  ],
})
export class AppModule {}
