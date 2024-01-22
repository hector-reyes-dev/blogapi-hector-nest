import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UsersService } from '../../../modules/users/services/users.service';
import { IsAdminGuard } from '../../../auth/guards/is-admin.guard';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { PostsService } from '../../posts/services/posts.service';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';

@ApiTags('Admin Module')
@Controller('admin')
export class AdminController {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Get('users')
  @ApiOperation({ summary: 'Get all users.' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({
    description: 'Administrator permissions required.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Get('posts')
  @ApiOperation({ summary: 'Get all posts.' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({
    description: 'Administrator permissions required.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  async getPosts() {
    return await this.postsService.findAll();
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete User.' })
  @ApiOkResponse({ description: 'User has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'User not founded.' })
  @ApiUnauthorizedResponse({
    description: 'Administrator permissions required.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  async deleteUsers(@Param('id', MongoIdPipe) id: string) {
    const user = this.usersService.delete(id);
    return user;
  }
}
