import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ type: String, description: "Post's title" })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ type: String, description: "Post's title. MongoId" })
  @IsMongoId()
  @IsOptional()
  author?: string;

  @ApiProperty({ type: String, description: "Post's Content" })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ type: [String], description: "Post's Categories" })
  @IsArray()
  @IsOptional()
  categories?: string[];
}
