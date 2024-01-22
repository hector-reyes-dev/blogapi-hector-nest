import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDto, CreateAdminUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { IsAdminGuard } from '../../../auth/guards/is-admin.guard';
import { IsOwnerGuard } from '../../../common/guards/is-owner.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Get()
  async getUsers() {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', MongoIdPipe) id: string) {
    const user = await this.usersService.findOne(id);
    return user;
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Post()
  async createAdmin(@Body() body: CreateAdminUserDto) {
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, body);
    return user;
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Delete(':id')
  async delete(@Param('id', MongoIdPipe) id: string) {
    const user = await this.usersService.delete(id);
    return user;
  }
}
