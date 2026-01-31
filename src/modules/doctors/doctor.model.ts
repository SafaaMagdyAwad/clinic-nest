import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';



@Module({
  imports: [UsersModule],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModel { }
