import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import database from './config/database.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database, jwtConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    PostsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
