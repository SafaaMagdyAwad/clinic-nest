import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AppointmentsService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@ApiTags('Appointments')
@ApiBearerAuth() 
@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Create appointment (User only)' })
  @ApiBody({ type: CreateAppointmentDto })
  @ApiResponse({ status: 201, description: 'Appointment created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request / doctor not available / overlap' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Body() dto: CreateAppointmentDto,
    @Req() req: Request & { user: { sub: string } },
  ) {
    return this.appointmentsService.create(dto, req.user.sub);
  }

  @Get('/me')
  @Roles(UserRole.DOCTOR)
  @ApiOperation({ summary: 'Get my appointments (Doctor only)' })
  @ApiResponse({ status: 200, description: 'Doctor appointments returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'appointments not found' })
  findAll(@Req() req: Request & { user: { sub: string } }) {
    return this.appointmentsService.findAllDoctorAppointments(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment by id' })
  @ApiParam({ name: 'id', example: '697fbf03fbf3d4853d10f0dc' })
  @ApiResponse({ status: 200, description: 'Appointment returned' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @ApiOperation({ summary: 'Update appointment status (Admin/Doctor)' })
  @ApiParam({ name: 'id', example: '697fbf03fbf3d4853d10f0dc' })
  @ApiBody({ type: UpdateAppointmentDto })
  @ApiResponse({ status: 200, description: 'Appointment updated successfully' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete appointment by id' })
  @ApiParam({ name: 'id', example: '697fbf03fbf3d4853d10f0dc' })
  @ApiResponse({ status: 200, description: 'Appointment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
