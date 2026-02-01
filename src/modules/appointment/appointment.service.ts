import { AvailabilityService } from './../availability/availability.service';

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Appointment, AppointmentDocument } from "./schemas/appointment.schema";
import { Model, Types } from "mongoose";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import moment from 'moment-timezone';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    private availabilityService: AvailabilityService
  ) { }



  async create(dto: CreateAppointmentDto, patientId: string) {
    const doctorId = dto.doctorId;
    const doctorObjectId = new Types.ObjectId(doctorId);

    // ✅ 1. تحقق من جدول الدكتور
    const doctorSchedule = await this.availabilityService.getByDoctorId(doctorId);
    //console.log(doctorSchedule, "doctorSchedule");
    
    if (!doctorSchedule) {
      throw new BadRequestException('جدول توافر الدكتور غير موجود.');
    }
    const appointmentDay = moment(dto.dateTimeStart).tz(doctorSchedule.timezone).format('dddd').toUpperCase(); // eg: MONDAY
    //console.log(appointmentDay,"appointmentDay");
    
    const scheduleForDay = doctorSchedule.weeklySchedule.find(d => d.day === appointmentDay);
    //console.log(scheduleForDay,"scheduleForDay");
    

    if (!scheduleForDay || !scheduleForDay.isWorkingDay || !scheduleForDay.workingHours) {
      throw new BadRequestException('الدكتور غير متاح في هذا اليوم.');
    }

    // تحويل مواعيد العمل والاستراحات إلى لحظات للتسهيل
    const startTime = moment(dto.dateTimeStart).tz(doctorSchedule.timezone);
    const endTime = moment(dto.dateTimeEnd).tz(doctorSchedule.timezone);

    const workingStart = moment(startTime.format('YYYY-MM-DD') + 'T' + scheduleForDay.workingHours.start).tz(doctorSchedule.timezone);
    const workingEnd = moment(startTime.format('YYYY-MM-DD') + 'T' + scheduleForDay.workingHours.end).tz(doctorSchedule.timezone);

    // تحقق أن الموعد داخل ساعات العمل
    if (startTime.isBefore(workingStart) || endTime.isAfter(workingEnd)) {
      throw new BadRequestException('الموعد خارج ساعات عمل الدكتور.');
    }

    // تحقق من الاستراحات
    for (const br of scheduleForDay.breaks) {
      const breakStart = moment(startTime.format('YYYY-MM-DD') + 'T' + br.start).tz(doctorSchedule.timezone);
      const breakEnd = moment(startTime.format('YYYY-MM-DD') + 'T' + br.end).tz(doctorSchedule.timezone);
      if (startTime.isBefore(breakEnd) && endTime.isAfter(breakStart)) {
        throw new BadRequestException('الوقت يقع ضمن فترة استراحة الدكتور.');
      }
    }

    // ✅ 2. تحقق من وجود مواعيد متضاربة لنفس الدكتور
    const overlapping = await this.appointmentModel.findOne({
      doctorId: doctorObjectId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        {
          dateTimeStart: { $lt: new Date(dto.dateTimeEnd) },
          dateTimeEnd: { $gt: new Date(dto.dateTimeStart) },
        },
      ],
    });

    if (overlapping) {
      throw new BadRequestException('هذا الموعد محجوز بالفعل. الرجاء اختيار وقت آخر.');
    }

    // ✅ 3. إنشاء الموعد
    const appointment = await this.appointmentModel.create({
      ...dto,
      patientId,
      doctorId: doctorObjectId,
    });

    return appointment;
  }


  async findAll() {
    return this.appointmentModel
      .find()
      .populate('doctorId', 'name email')
      .populate('patientId', 'name email')
      .sort({ createdAt: -1 });
  }
  async findAllDoctorAppointments(doctorId: string) {
    if (!Types.ObjectId.isValid(doctorId)) {
      throw new BadRequestException('Invalid doctorId');
    }

    return this.appointmentModel
      .find({ doctorId: new Types.ObjectId(doctorId) })
      .populate('doctorId', 'name email')
      .populate('patientId', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    const appointment = await this.appointmentModel
      .findById(id)
      .populate('doctorId', 'name email')
      .populate('patientId', 'name email');

    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async update(id: string, dto: UpdateAppointmentDto) {
    const appointment = await this.appointmentModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async remove(id: string) {
    const appointment = await this.appointmentModel.findByIdAndDelete(id);
    if (!appointment) throw new NotFoundException('Appointment not found');
    return { message: 'Appointment deleted successfully' };
  }
}
