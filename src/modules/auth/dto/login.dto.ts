import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'safaa@gmail.com' })
  email: string;

  @MinLength(6)
  @ApiProperty({ example: '01012345678' })
  password: string;
}
