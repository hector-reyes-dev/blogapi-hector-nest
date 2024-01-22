import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { Post, PostSchema } from './schemas/post.schema';
import jwtConfig from '../../config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: (configService: ConfigType<typeof jwtConfig>) => ({
        secret: configService.secret,
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
