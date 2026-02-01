import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsController } from './medical-records.controller';
import { MedicalRecord, MedicalRecordSchema } from './schemas/medical-record.schema';
import { AppointmentsModule } from '../appointment/appointment.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MedicalRecord.name, schema: MedicalRecordSchema }])
    ,AppointmentsModule
  ],
  providers: [MedicalRecordsService],
  controllers: [MedicalRecordsController],
})
export class MedicalRecordsModule {}
