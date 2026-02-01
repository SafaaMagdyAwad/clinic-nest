import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AppointmentsService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { JwtAuthGuard } from "src/common/jwt-auth.guard";
import { RolesGuard } from "src/common/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { UserRole } from "../users/schemas/user.schema";

@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @Post()
  @Roles(UserRole.USER)
  create(@Body() dto: CreateAppointmentDto,@Req() req: Request & { user: { sub: string } }) {
    return this.appointmentsService.create(dto,req.user.sub);
  }

  @Get('/me')
  @Roles(UserRole.DOCTOR)
  findAll(@Req() req: Request & { user: { sub: string } }) {
    return this.appointmentsService.findAllDoctorAppointments(req.user.sub);
  }

  @Get(':id')
  //ervery one can
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN , UserRole.DOCTOR)
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, dto);
  }

  @Delete(':id')
  //everyonecan
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
