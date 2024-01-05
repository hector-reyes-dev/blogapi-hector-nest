import { IsOptional, IsPositive, Min, ValidateIf } from 'class-validator';

export class PaginationPostsDto {
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsPositive()
  @ValidateIf((params) => params.limit)
  @Min(0)
  offset?: number;
}
