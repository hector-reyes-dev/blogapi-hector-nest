import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../users/schemas/user.schema';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: User | Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String] })
  categories: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
