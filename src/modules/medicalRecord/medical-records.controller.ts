import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
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

@ApiTags('medical-records')
@ApiBearerAuth() 
@Controller('medical-records')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MedicalRecordsController {
  constructor(private service: MedicalRecordsService) {}

  @ApiOperation({ summary: 'Create medical record (Doctor only)' })
  @ApiBody({ type: CreateMedicalRecordDto })
  @ApiResponse({ status: 201, description: 'Medical record created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid appointmentId' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (not doctor)' })
  @Post()
  @Roles(UserRole.DOCTOR)
  create(
    @Body() dto: CreateMedicalRecordDto,
    @Req() req: Request & { user: { sub: string } },
  ) {
    return this.service.create(dto, req.user.sub);
  }

  @ApiOperation({ summary: 'Get all medical records for logged doctor(Doctor only)' })
  @ApiResponse({ status: 200, description: 'List of records returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (not doctor)' })
  @Get()
  @Roles(UserRole.DOCTOR)
  findDoctorsAll(@Req() req: Request & { user: { sub: string } }) {
    return this.service.findDoctorsAll(req.user.sub);
  }

  @ApiOperation({ summary: 'Get one medical record (Doctor or Patient)' })
  @ApiParam({ name: 'id', example: '65c9f7b9b2f2d2d7a2b7f999' })
  @ApiResponse({ status: 200, description: 'Record returned successfully' })
  @ApiResponse({ status: 400, description: 'Invalid ID' })
  @ApiResponse({ status: 404, description: 'Medical record not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get(':id')
  @Roles(UserRole.USER, UserRole.DOCTOR)
  findOne(
    @Param('id') id: string,
    @Req() req: Request & { user: { sub: string } },
  ) {
    return this.service.findOne(id, req.user.sub);
  }

  @ApiOperation({ summary: 'Update medical record (Doctor only)' })
  @ApiParam({ name: 'id', example: '65c9f7b9b2f2d2d7a2b7f999' })
  @ApiBody({ type: UpdateMedicalRecordDto })
  @ApiResponse({ status: 200, description: 'Record updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid ID' })
  @ApiResponse({ status: 404, description: 'Medical record not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (not doctor)' })
  @Put(':id')
  @Roles(UserRole.DOCTOR)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMedicalRecordDto,
    @Req() req: Request & { user: { sub: string } },
  ) {
    return this.service.update(id, dto, req.user.sub);
  }

  @ApiOperation({ summary: 'Delete medical record (Doctor only)' })
  @ApiParam({ name: 'id', example: '65c9f7b9b2f2d2d7a2b7f999' })
  @ApiResponse({ status: 200, description: 'Medical record deleted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid ID' })
  @ApiResponse({ status: 404, description: 'Medical record not found or unauthorized' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (not doctor)' })
  @Delete(':id')
  @Roles(UserRole.DOCTOR)
  remove(
    @Param('id') id: string,
    @Req() req: Request & { user: { sub: string } },
  ) {
    return this.service.remove(id, req.user.sub);
  }
}
