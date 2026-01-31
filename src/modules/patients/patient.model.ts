import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';


@Module({
  imports: [UsersModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModel { }
