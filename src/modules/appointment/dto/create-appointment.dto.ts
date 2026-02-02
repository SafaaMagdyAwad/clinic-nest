import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsMongoId()
  @ApiProperty({ example: '697fa05b518715ed12345678', description: 'Doctor ID' })
  doctorId: string;

  @IsDateString()
  @ApiProperty({ example: '2026-02-02T10:00:00.000Z' })
  dateTimeStart: string;

  @IsDateString()
  @ApiProperty({ example: '2026-02-02T10:30:00.000Z' })
  dateTimeEnd: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Medical examination' })
  reason: string;

  @IsString()
  @IsOptional()
    @ApiPropertyOptional({ example: 'I suffer from chronic headaches' })
  notes?: string;
}
