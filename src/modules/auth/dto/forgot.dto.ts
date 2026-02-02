import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDTO {
  @IsEmail()
  @ApiProperty({ example: 'safaa@gmail.com' })
  email: string;

  
}
