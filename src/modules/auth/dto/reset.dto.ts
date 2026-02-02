import { ApiProperty } from '@nestjs/swagger';
import {  MinLength } from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty({ example: 'safaa@gmail.com' })
  @MinLength(6)
  password: string;
}
