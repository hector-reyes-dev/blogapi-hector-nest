import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';

import { UsersService } from '../../../modules/users/services/users.service';
import { IsAdminGuard } from '../../../auth/guards/is-admin.guard';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { PostsService } from '../../posts/services/posts.service';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';

@Controller('admin')
export class AdminController {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Get('users')
  async getUsers() {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Get('posts')
  async getPosts() {
    return await this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Delete('users/:id')
  async deleteUsers(@Param('id', MongoIdPipe) id: string) {
    const user = this.usersService.delete(id);
    return user;
  }
}
