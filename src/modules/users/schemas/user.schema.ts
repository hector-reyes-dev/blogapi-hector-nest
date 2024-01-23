import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: true,
    type: String,
  })
  @Prop({ required: true })
  username: string;

  @ApiProperty({
    example: 'nosafepassword123',
    description: 'The password of the user',
    required: true,
    type: String,
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    example: false,
    description: 'The admin permissions of the user',
    type: Boolean,
    default: false,
  })
  @Prop({ default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
