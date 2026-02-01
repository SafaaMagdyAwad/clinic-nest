import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { UpsertAvailabilityDto } from './dto/upsert-availability.dto';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles.guard';
import { UserRole } from '../users/schemas/user.schema';
import { Roles } from '../auth/roles.decorator';


@Controller('availability')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AvailabilityController {
    constructor(private  availabilityService: AvailabilityService) {}

  // doctor sets his own availability
  @Put('me')
  @Roles(UserRole.DOCTOR)
  upsertMyAvailability(@Req() req: Request & { user: { sub: string } }, @Body() dto: UpsertAvailabilityDto) {
    
    return this.availabilityService.upsert(req.user.sub, dto);
}

  // doctor views his own availability
  @Get('me')
  @Roles(UserRole.DOCTOR)
  getMyAvailability(@Req() req: Request & { user: { sub: string } }) {
    return this.availabilityService.getByDoctorId(req.user.sub);
  }

  // patient/admin can view doctor availability
  @Get('doctor/:doctorId')
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.DOCTOR)
  getDoctorAvailability(@Param('doctorId') doctorId: string) {
    return this.availabilityService.getByDoctorId(doctorId);
  }

  // doctor deletes his availability
  @Delete('me')
  @Roles(UserRole.DOCTOR)
  deleteMyAvailability(@Req()  req:Request & { user: { sub: string } }) {
    return this.availabilityService.deleteByDoctorId(req.user.sub);
  }
}
