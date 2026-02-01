import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { WeekDay } from '../schemas/availability.schema';

class TimeRangeDto {
  @IsString()
  start: string; // "09:00"

  @IsString()
  end: string; // "17:00"
}

class DayScheduleDto {
  @IsEnum(WeekDay)
  day: WeekDay;

  @IsBoolean()
  isWorkingDay: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => TimeRangeDto)
  workingHours?: TimeRangeDto | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeRangeDto)
  breaks?: TimeRangeDto[];
}

export class UpsertAvailabilityDto {
  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(180)
  slotDurationMinutes?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayScheduleDto)
  weeklySchedule?: DayScheduleDto[];
}
