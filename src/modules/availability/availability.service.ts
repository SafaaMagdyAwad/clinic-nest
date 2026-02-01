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
    const newAvail=this.availabilityModel.findOneAndUpdate(
      { doctorId: new Types.ObjectId(doctorId) },
      { $set: dto },
      { new: true, upsert: true },
    );
    //console.log(newAvail);
    
    return newAvail ;
  }

  async getByDoctorId(doctorId: string) {
    //console.log(doctorId ,"doctorId");
    
    return this.availabilityModel.findOne({
      doctorId: new Types.ObjectId(doctorId),
    });
  }

  async deleteByDoctorId(doctorId: string) {
    return this.availabilityModel.findOneAndDelete({
      doctorId: new Types.ObjectId(doctorId),
    });
  }
}
