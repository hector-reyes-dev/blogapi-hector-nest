import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsMongoId } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ type: String, description: "Post's title" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String, description: "Post's title. MongoId" })
  @IsMongoId()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ type: String, description: "Post's Content" })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: [String], description: "Post's Categories" })
  @IsArray()
  @IsNotEmpty()
  categories: string[];
}
