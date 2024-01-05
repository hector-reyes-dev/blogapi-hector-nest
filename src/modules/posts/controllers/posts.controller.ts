import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PaginationPostsDto } from '../dto/pagination-posts.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getPosts(@Query() params: PaginationPostsDto) {
    return await this.postsService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id', MongoIdPipe) id: string) {
    const post = await this.postsService.findOne(id);
    return post;
  }

  @Post()
  async create(@Body() body: CreatePostDto) {
    return await this.postsService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() body: UpdatePostDto,
  ) {
    const post = await this.postsService.update(id, body);
    return post;
  }

  @Delete(':id')
  async delete(@Param('id', MongoIdPipe) id: string) {
    const post = await this.postsService.delete(id);
    return post;
  }
}
