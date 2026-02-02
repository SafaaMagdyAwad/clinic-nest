import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { AppointmentStatus } from '../schemas/appointment.schema';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsEnum(AppointmentStatus)
  @IsOptional()
  @ApiPropertyOptional({ 
    enum: AppointmentStatus, 
    example: AppointmentStatus.CONFIRMED,
    description: 'The status of the appointment'
  })
  status?: AppointmentStatus;
}
