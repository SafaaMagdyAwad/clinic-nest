import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModel } from './modules/doctors/doctor.model';
import { PatientModel } from './modules/patients/patient.model';
import { AvailabilityModule } from './modules/availability/availability.model';
import { AppointmentsModule } from './modules/appointment/appointment.model';
import { MedicalRecordsModule } from './modules/medicalRecord/medical-records.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    DoctorModel,
    PatientModel,
    AvailabilityModule,
    AppointmentsModule,
    MedicalRecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
