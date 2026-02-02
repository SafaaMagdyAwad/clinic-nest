import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Availability, AvailabilityDocument } from './schemas/availability.schema';
import { UpsertAvailabilityDto } from './dto/upsert-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectModel(Availability.name)
    private availabilityModel: Model<AvailabilityDocument>,
  ) {}

  async upsert(doctorId: string, dto: UpsertAvailabilityDto) {
    //console.log(dto);
    const newAvail=await this.availabilityModel.findOneAndUpdate(
      { doctorId: new Types.ObjectId(doctorId) },
      { $set: dto },
      { new: true, upsert: true },
    );
    //console.log(newAvail);
    
    return {message:"success" ,newAvail} ;
  }

  async getByDoctorId(doctorId: string) {
    //لازم ترجه النتيجه بس عشان مستخدماها في مكان تاني
    return this.availabilityModel.findOne({
      doctorId: new Types.ObjectId(doctorId),
    });
  }

  async deleteByDoctorId(doctorId: string) {
    const availability= this.availabilityModel.findOneAndDelete({
      doctorId: new Types.ObjectId(doctorId),
    });
    return {message:"success" , availability}
  }
}
