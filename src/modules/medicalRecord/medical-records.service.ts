import { Appointment } from './../appointment/schemas/appointment.schema';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MedicalRecord, MedicalRecordDocument } from './schemas/medical-record.schema';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { AppointmentsService } from '../appointment/appointment.service';
import { string } from 'joi';
import { log } from 'console';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectModel(MedicalRecord.name)
    private medicalRecordModel: Model<MedicalRecordDocument>,
    private appointmentsService: AppointmentsService

  ) { }

  async create(dto: CreateMedicalRecordDto, doctorId) {

    if (!Types.ObjectId.isValid(dto.appointmentId)) {
      throw new BadRequestException('Invalid appointmentId');
    }
    const record = await this.medicalRecordModel.create({ ...dto, doctorId });
    return record;
  }

  async findDoctorsAll(doctorId: string) {
    const allRecords = this.medicalRecordModel.find({ doctorId }).populate({
      path: 'appointmentId',
      populate: ['doctorId', 'patientId'],
    })
      .sort({ createdAt: -1 })
      .exec();
    return allRecords;
  }



  async findOne(id: string, userId: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid ID');


    const record = await this.medicalRecordModel.findById(id);

    if (!record) throw new NotFoundException('Medical record not found');
    const appointment = await this.appointmentsService.findOne(record.appointmentId.toString());
    if (!appointment) {
      throw new NotFoundException('Medical record not found');
    }
    console.log(appointment);

    if (!(appointment.doctorId._id.toString() == userId) && !(appointment.patientId._id.toString() == userId)) {
      throw new NotFoundException('Medical record not found');
    }
    return record;
  }

  async update(id: string, dto: UpdateMedicalRecordDto, userId: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid ID');
    console.log(id, "id");

    const record = await this.medicalRecordModel.findByIdAndUpdate(id, dto, { new: true });
    console.log(record, "record");

    if (!record || !(record.doctorId.toString() === userId)) {
      throw new NotFoundException('Medical record not found');
    }
    return record;
  }


  async remove(id: string, userId: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid ID');

    const record = await this.medicalRecordModel.findById(id);

    if (!record || record.doctorId.toString() !== userId.toString()) {
      throw new NotFoundException('Medical record not found or unauthorized');
    }

    await this.medicalRecordModel.findByIdAndDelete(id);

    return { message: 'Medical record deleted successfully' };
  }

}
