import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ type: String, description: "User's username" })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ type: String, description: "User's password" })
  @IsString()
  @IsOptional()
  @Length(6)
  password?: string;
}
