import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ type: String, description: "User's username to Log In" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String, description: "User's password to Log In" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
