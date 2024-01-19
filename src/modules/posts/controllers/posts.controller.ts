import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PaginationPostsDto } from '../dto/pagination-posts.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPosts(@Query() params: PaginationPostsDto) {
    return await this.postsService.findAll(params);
  }

  @Get('search')
  async searchPosts(
    @Query('query') query: string,
    @Query() params: PaginationPostsDto,
  ) {
    const posts = await this.postsService.searchPosts(query, params);
    return posts;
  }

  @Get(':id')
  async findOne(@Param('id', MongoIdPipe) id: string) {
    const post = await this.postsService.findOne(id);
    return post;
  }

  @Get('user/:id')
  async findByAuthor(@Param('id', MongoIdPipe) id: string) {
    const posts = await this.postsService.findByAuthor(id);
    return posts;
  }

  @Post()
  async create(@Body() body: CreatePostDto) {
    return await this.postsService.create(body);
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() body: UpdatePostDto,
  ) {
    const post = await this.postsService.update(id, body);
    return post;
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Delete(':id')
  async delete(@Param('id', MongoIdPipe) id: string) {
    const post = await this.postsService.delete(id);
    return post;
  }
}
