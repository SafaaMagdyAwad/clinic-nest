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

import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';

class TimeRangeDto {
  @ApiProperty({ example: '09:00' })
  @IsString()
  start: string;

  @ApiProperty({ example: '17:00' })
  @IsString()
  end: string;
}

class DayScheduleDto {
  @ApiProperty({ enum: WeekDay, example: WeekDay.SUNDAY })
  @IsEnum(WeekDay)
  day: WeekDay;

  @ApiProperty({ example: true })
  @IsBoolean()
  isWorkingDay: boolean;

  @ApiPropertyOptional({
    oneOf: [{ $ref: getSchemaPath(TimeRangeDto) }],
    example: { start: '09:00', end: '17:00' },
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TimeRangeDto)
  workingHours?: TimeRangeDto | null;

  @ApiPropertyOptional({
    type: 'array',
    items: { $ref: getSchemaPath(TimeRangeDto) },
    example: [{ start: '13:00', end: '14:00' }],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeRangeDto)
  breaks?: TimeRangeDto[];
}

@ApiExtraModels(TimeRangeDto, DayScheduleDto)
export class UpsertAvailabilityDto {
  @ApiPropertyOptional({ example: 'Africa/Cairo' })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiPropertyOptional({ example: 30, minimum: 5, maximum: 180 })
  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(180)
  slotDurationMinutes?: number;

  @ApiPropertyOptional({
    type: 'array',
    items: { $ref: getSchemaPath(DayScheduleDto) },
    example: [
      {
        day: WeekDay.SUNDAY,
        isWorkingDay: true,
        workingHours: { start: '09:00', end: '17:00' },
        breaks: [{ start: '13:00', end: '14:00' }],
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayScheduleDto)
  weeklySchedule?: DayScheduleDto[];
}
