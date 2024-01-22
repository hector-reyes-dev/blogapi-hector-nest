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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto, CreateAdminUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { IsAdminGuard } from '../../../auth/guards/is-admin.guard';
import { IsOwnerGuard } from '../../../common/guards/is-owner.guard';

@ApiTags('Users Module')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
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

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID.' })
  @ApiFoundResponse({ description: 'User founded.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnauthorizedResponse({
    description: 'You must be logged in.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', MongoIdPipe) id: string) {
    const user = await this.usersService.findOne(id);
    return user;
  }

  @Post()
  @ApiOperation({ summary: 'Create user.' })
  @ApiCreatedResponse({ description: 'User has been successfully created.' })
  @ApiBadRequestResponse({ description: 'User already exists.' })
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Post()
  @ApiOperation({ summary: 'Create admin user.' })
  @ApiCreatedResponse({ description: 'Admin has been successfully created.' })
  @ApiBadRequestResponse({ description: 'User already exists.' })
  @ApiUnauthorizedResponse({
    description: 'Administrator permissions required.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  async createAdmin(@Body() body: CreateAdminUserDto) {
    return this.usersService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user.' })
  @ApiOkResponse({ description: 'User has been successfully updated.' })
  @ApiNotFoundResponse({ description: 'User not founded.' })
  @ApiUnauthorizedResponse({
    description: 'You are not the owner or you need to log in.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, body);
    return user;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User.' })
  @ApiOkResponse({ description: 'User has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'User not founded.' })
  @ApiUnauthorizedResponse({
    description: 'Administrator permissions required.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  async delete(@Param('id', MongoIdPipe) id: string) {
    const user = await this.usersService.delete(id);
    return user;
  }
}
