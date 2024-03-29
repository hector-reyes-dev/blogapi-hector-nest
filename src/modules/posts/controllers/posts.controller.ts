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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PaginationPostsDto } from '../dto/pagination-posts.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { IsOwnerGuard } from '../../../common/guards/is-owner.guard';

@ApiTags('Posts Module')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts.' })
  @ApiOkResponse({ description: 'Return all posts.' })
  @ApiNotFoundResponse({ description: 'Posts not found.' })
  async getPosts(@Query() params: PaginationPostsDto) {
    return await this.postsService.findAll(params);
  }

  @Get('search')
  @ApiOperation({ summary: 'Find posts by query param.' })
  @ApiFoundResponse({ description: 'Return posts with query param.' })
  @ApiNotFoundResponse({ description: 'Posts not found.' })
  async searchPosts(
    @Query('query') query: string,
    @Query() params: PaginationPostsDto,
  ) {
    const posts = await this.postsService.searchPosts(query, params);
    return posts;
  }

  @Get('filter/category/:category')
  @ApiOperation({ summary: 'Find posts by category.' })
  @ApiFoundResponse({ description: 'Return all posts by category.' })
  @ApiNotFoundResponse({ description: 'Posts not found.' })
  async filterPostsByCategory(
    @Param('category') category: string,
    @Query() params: PaginationPostsDto,
  ) {
    const posts = await this.postsService.findPostsByCategory(category, params);
    return posts;
  }

  @Get('filter/author/:id')
  @ApiOperation({ summary: 'Find posts by author ID.' })
  @ApiFoundResponse({ description: 'Return post by author ID.' })
  @ApiNotFoundResponse({ description: 'Posts not found.' })
  async filterPostsByAuthor(@Param('id', MongoIdPipe) id: string) {
    const posts = await this.postsService.findByAuthor(id);
    return posts;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find post by ID.' })
  @ApiFoundResponse({ description: 'Return post by ID.' })
  @ApiNotFoundResponse({ description: 'Posts not found.' })
  async findOne(@Param('id', MongoIdPipe) id: string) {
    const post = await this.postsService.findOne(id);
    return post;
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Find all posts by user ID.' })
  @ApiFoundResponse({ description: 'Return all posts by user ID.' })
  @ApiNotFoundResponse({ description: 'Posts not found.' })
  async findByAuthor(@Param('id', MongoIdPipe) id: string) {
    const posts = await this.postsService.findByAuthor(id);
    return posts;
  }

  @Post()
  @ApiOperation({ summary: 'Create post.' })
  @ApiCreatedResponse({ description: 'User has been successfully created.' })
  @ApiNotFoundResponse({ description: 'Posts not found.' })
  @ApiUnauthorizedResponse({
    description: 'You must be logged in.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreatePostDto) {
    return await this.postsService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update post by ID.' })
  @ApiOkResponse({ description: 'Post has been successfully updated.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @ApiUnauthorizedResponse({
    description: 'You are not the owner or you need to log in.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() body: UpdatePostDto,
  ) {
    const post = await this.postsService.update(id, body);
    return post;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post by ID.' })
  @ApiOkResponse({ description: 'Post has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Post not founded.' })
  @ApiUnauthorizedResponse({
    description: 'You are not the owner or you need to log in.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  async delete(@Param('id', MongoIdPipe) id: string) {
    const post = await this.postsService.delete(id);
    return post;
  }
}
