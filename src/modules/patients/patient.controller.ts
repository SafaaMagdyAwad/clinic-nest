import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles.guard';
import { PatientService } from './patient.service';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { UpdatePatientDto } from './dto/update-patient.dto';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('patient')
@ApiBearerAuth()
@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientController {
  constructor(private patientService: PatientService) {}

  // ---------------- PATIENT ----------------
  @ApiOperation({ summary: 'Get my profile (Patient only)' })
  @ApiResponse({ status: 200, description: 'Account fetched successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('me')
  @Roles(UserRole.USER)
  getMyProfile(@Req() req: Request & { user: { sub: string } }) {
    return this.patientService.findById(req.user.sub);
  }

  @ApiOperation({ summary: 'Update my profile (Patient only)' })
  @ApiBody({ type: UpdatePatientDto })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Patch('me')
  @Roles(UserRole.USER)
  updateMyProfile(
    @Req() req: Request & { user: { sub: string } },
    @Body() dto: UpdatePatientDto,
  ) {
    return this.patientService.update(req.user.sub, dto);
  }

  @ApiOperation({ summary: 'Delete my profile (Patient only)' })
  @ApiResponse({ status: 200, description: 'Profile deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete('me')
  @Roles(UserRole.USER)
  deleteMyProfile(@Req() req: Request & { user: { sub: string } }) {
    return this.patientService.delete(req.user.sub);
  }

  // ---------------- DOCTOR ----------------
  @ApiOperation({ summary: 'Get my patients (Doctor only)' })
  @ApiResponse({ status: 200, description: 'Patients returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('doctor')
  @Roles(UserRole.DOCTOR)
  getMyPatients(@Req() req: Request & { user: { sub: string } }) {
    return this.patientService.getPatientsByDoctor(req.user.sub);
  }

  // ---------------- ADMIN ----------------
  @ApiOperation({ summary: 'Get all patients (Admin only)' })
  @ApiResponse({ status: 200, description: 'Patients list returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get()
  @Roles(UserRole.ADMIN)
  getAllUsers() {
    return this.patientService.findAll();
  }

  @ApiOperation({ summary: 'Delete patient by id (Admin only)' })
  @ApiParam({ name: 'id', example: '65c9f7b9b2f2d2d7a2b7f999' })
  @ApiResponse({ status: 200, description: 'Patient deleted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid ID' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  deleteUser(@Param('id') id: string) {
    return this.patientService.delete(id);
  }

  // ------------ ADMIN&DOCTOR -------------
  @ApiOperation({ summary: 'Get patient by id (Doctor/Admin)' })
  @ApiParam({ name: 'id', example: '697fde17dc84fac4c71b2e4a' })
  @ApiResponse({ status: 200, description: 'Patient returned successfully' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get(':id')
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  getPatientById(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }
}
