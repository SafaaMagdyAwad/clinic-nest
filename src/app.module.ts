import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModel } from './modules/doctors/doctor.model';
import { PatientModel } from './modules/patients/patient.model';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // ✅ important
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    DoctorModel,
    PatientModel,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
