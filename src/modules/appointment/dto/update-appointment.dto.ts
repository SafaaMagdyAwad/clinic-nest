import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { AppointmentStatus } from '../schemas/appointment.schema';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;
}
