import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Appointment, AppointmentSchema } from "./schemas/appointment.schema";
import { AppointmentsController } from "./appointment.controller";
import { AppointmentsService } from "./appointment.service";
import { AvailabilityModule } from "../availability/availability.model";

@Module
({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    AvailabilityModule
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService ],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
