import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  @Length(6)
  password?: string;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}
