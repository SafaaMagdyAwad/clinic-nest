import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  // ---------------- ADMIN ----------------
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create doctor (Admin only)' })
  @ApiBody({ type: CreateDoctorDto })
  @ApiResponse({ status: 201, description: 'Doctor created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Admin only)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorService.create(dto);
  }

  // ---------------- PUBLIC ----------------
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiResponse({ status: 200, description: 'Doctors list returned successfully' })
  @Get()
  getAll() {
    return this.doctorService.findAll();
  }

  @ApiOperation({ summary: 'Get doctor by id' })
  @ApiParam({ name: 'id', example: '65c9f7b9b2f2d2d7a2b7f999' })
  @ApiResponse({ status: 200, description: 'Doctor returned successfully' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  // ---------------- ADMIN ----------------
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update doctor (Admin only)' })
  @ApiParam({ name: 'id', example: '65c9f7b9b2f2d2d7a2b7f999' })
  @ApiBody({ type: UpdateDoctorDto })
  @ApiResponse({ status: 200, description: 'Doctor updated successfully' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Admin only)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id') // ✅ كان ناقص
  updateDoctor(@Param('id') id: string, @Body() dto: UpdateDoctorDto) {
    return this.doctorService.updateDoctor(id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete doctor (Admin only)' })
  @ApiParam({ name: 'id', example: '65c9f7b9b2f2d2d7a2b7f999' })
  @ApiResponse({ status: 200, description: 'Doctor deleted successfully' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Admin only)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  deleteDoctor(@Param('id') id: string) {
    return this.doctorService.deleteDoctor(id);
  }
}
