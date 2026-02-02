import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength
} from 'class-validator';
export class CreateDoctorDto {
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