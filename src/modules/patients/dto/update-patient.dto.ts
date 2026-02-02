import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class UpdatePatientDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Safaa Magdy' })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ example: 'safaa@gmail.com' })
  email?: string;

  @IsOptional()
  @MinLength(6)
  @ApiPropertyOptional({ example: '01012345678' })
  password?: string;

}
