import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new NotFoundException(`User #${username} not found`);
    return user;
  }

  async create(createUser: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(createUser.password, 10);
    const createdUser = new this.userModel({ ...createUser, password });
    return createdUser.save();
  }

  async update(id: string, updateUser: UpdateUserDto): Promise<User> {
    if (updateUser.password) {
      const password = await bcrypt.hash(updateUser.password, 10);
      updateUser = { ...updateUser, password };
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: updateUser }, { new: true })
      .exec();

    if (!user) throw new NotFoundException(`User #${id} not found`);

    return user;
  }

  async delete(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }
}
