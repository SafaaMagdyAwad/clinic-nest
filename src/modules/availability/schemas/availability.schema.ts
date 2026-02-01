import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AvailabilityDocument = HydratedDocument<Availability>;

export enum WeekDay {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

@Schema({ _id: false })
export class TimeRange {
  @Prop({ required: true }) // "09:00"
  start: string;

  @Prop({ required: true }) // "17:00"
  end: string;
}

const TimeRangeSchema = SchemaFactory.createForClass(TimeRange);

@Schema({ _id: false })
export class DaySchedule {
  @Prop({ type: String, enum: WeekDay, required: true })
  day: WeekDay;

  @Prop({ default: false })
  isWorkingDay: boolean;

  @Prop({ type: TimeRangeSchema, default: null })
  workingHours: TimeRange | null;

  @Prop({ type: [TimeRangeSchema], default: [] })
  breaks: TimeRange[];
}

const DayScheduleSchema = SchemaFactory.createForClass(DaySchedule);

@Schema({ timestamps: true })
export class Availability {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  doctorId: Types.ObjectId;

  @Prop({ default: 'Africa/Cairo' })
  timezone: string;

  @Prop({ default: 30, min: 5, max: 180 })
  slotDurationMinutes: number;

  @Prop({ type: [DayScheduleSchema], default: [] })
  weeklySchedule: DaySchedule[];
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);

// important: one availability per doctor
AvailabilitySchema.index({ doctorId: 1 }, { unique: true });
