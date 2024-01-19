import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from '../schemas/post.schema';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PaginationPostsDto } from '../dto/pagination-posts.dto';

@Injectable()
export class PostsService {
  itemsLimit = 10;

  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async findAll(params?: PaginationPostsDto) {
    if (params.limit && params.offset) {
      return this.postModel
        .find()
        .populate('author')
        .limit(params.limit)
        .skip(params.offset)
        .exec();
    }

    return this.postModel
      .find()
      .populate('author')
      .limit(params.limit || this.itemsLimit)
      .exec();
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id).populate('author').exec();
    if (!post) throw new NotFoundException(`Post #${id} not found`);
    return post;
  }

  async findByAuthor(authorId: string) {
    return this.postModel.find({ author: authorId }).populate('author').exec();
  }

  async searchPosts(query: string, params?: PaginationPostsDto) {
    let posts = [];
    const queryRegx = new RegExp(query, 'i');
    const filter = {
      $or: [
        { title: { $regex: queryRegx } },
        { content: { $regex: queryRegx } },
      ],
    };

    if (params.limit && params.offset) {
      posts = await this.postModel
        .find(filter)
        .populate('author')
        .limit(params.limit)
        .skip(params.offset)
        .exec();

      if (!posts.length)
        throw new NotFoundException(`Posts with ${query} not found`);

      return posts;
    }

    posts = await this.postModel
      .find(filter)
      .populate('author')
      .limit(params.limit || this.itemsLimit)
      .exec();

    if (!posts.length)
      throw new NotFoundException(`Posts with ${query} not found`);

    return posts;
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
