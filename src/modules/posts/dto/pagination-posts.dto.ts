import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, ValidateIf } from 'class-validator';

export class PaginationPostsDto {
  @ApiProperty({ type: Number, description: 'Limit of posts to get' })
  @IsOptional()
  @IsPositive()
  limit?: number;

  @ApiProperty({
    type: Number,
    description: 'Offset of posts to get. Limit has to be given to use Offset.',
    minimum: 0,
  })
  @IsOptional()
  @IsPositive()
  @ValidateIf((params) => params.limit)
  offset?: number;
}
