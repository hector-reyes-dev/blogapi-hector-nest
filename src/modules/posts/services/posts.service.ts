import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from '../schemas/post.schema';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async findAll() {
    return this.postModel.find().exec();
  }

  async findOne(id: string) {
    return this.postModel.findById(id);
  }

  async create(createPost: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPost);
    return createdPost.save();
  }

  async update(id: string, updatePost: UpdatePostDto): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, updatePost, { new: true });
  }

  async delete(id: string) {
    return this.postModel.findByIdAndDelete(id);
  }
}
