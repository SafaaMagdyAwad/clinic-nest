import { User } from './../../users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Appointment } from 'src/modules/appointment/schemas/appointment.schema';


export type MedicalRecordDocument = MedicalRecord & Document;

@Schema({ timestamps: true })
export class MedicalRecord {
  @Prop({ type: Types.ObjectId, ref: Appointment.name, required: true })
  appointmentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true})
  doctorId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  diagnosis: string;

  @Prop({ required: true, trim: true })
  prescription: string;

  @Prop({ type: [String], default: [] })
  attachments?: string[];
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
