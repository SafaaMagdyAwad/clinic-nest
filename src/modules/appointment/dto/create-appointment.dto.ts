import { IsDateString, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsMongoId()
  doctorId: string;

  @IsDateString()
  dateTimeStart: string;

  @IsDateString()
  dateTimeEnd: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
