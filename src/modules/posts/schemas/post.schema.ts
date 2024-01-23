import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/schemas/user.schema';

@Schema({ timestamps: true })
export class Post extends Document {
  @ApiProperty({
    example: "Best Post's Title",
    description: "Post's Title string",
    required: true,
    type: String,
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: 'Héctor Reyes',
    description: 'Author reference to User Schema',
    required: true,
    type: () => User,
  })
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: User | Types.ObjectId;

  @ApiProperty({
    example: 'Héctor Reyes',
    description: 'Author reference to User Schema',
    required: true,
    type: String,
  })
  @Prop({ required: true })
  content: string;

  @ApiProperty({
    example: ['web dev', 'design', 'ui'],
    description: 'Array of categories',
    type: [String],
  })
  @Prop({ type: [String] })
  categories: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
