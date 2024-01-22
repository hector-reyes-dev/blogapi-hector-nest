import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateAdminUserDto {
  @ApiProperty({ type: String, description: "User's username" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String, description: "User's password" })
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;

  @ApiProperty({
    type: Boolean,
    description: "User's isAdmin optional property",
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isAdmin? = false;
}

export class CreateUserDto extends OmitType(CreateAdminUserDto, [
  'isAdmin',
] as const) {}
