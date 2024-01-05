import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from '../schemas/post.schema';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PaginationPostsDto } from '../dto/pagination-posts.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async findAll(params?: PaginationPostsDto) {
    if (params) {
      const { limit, offset } = params;
      return this.postModel.find().limit(limit).skip(offset).exec();
    }
    return this.postModel.find().exec();
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException(`Post #${id} not found`);
    return post;
  }

  async create(createPost: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPost);
    return createdPost.save();
  }

  async update(id: string, updatePost: UpdatePostDto): Promise<Post> {
    const post = await this.postModel
      .findByIdAndUpdate(id, { $set: updatePost }, { new: true })
      .exec();
    if (!post) throw new NotFoundException(`Post #${id} not found`);
    return post;
  }

  async delete(id: string) {
    const post = await this.postModel.findByIdAndDelete(id);
    if (!post) throw new NotFoundException(`Post #${id} not found`);
    return post;
  }
}
