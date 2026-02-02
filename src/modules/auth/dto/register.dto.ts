import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Safaa Magdy' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'safaa@gmail.com' })
  email: string;

  @MinLength(6)
  @ApiProperty({ example: '01012345678' })
  password: string;
}
