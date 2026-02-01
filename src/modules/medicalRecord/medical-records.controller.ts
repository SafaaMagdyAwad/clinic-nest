import { User } from './../users/schemas/user.schema';
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@Controller('medical-records')
@UseGuards(JwtAuthGuard, RolesGuard)

export class MedicalRecordsController {
  constructor(private  service: MedicalRecordsService,
  ) { }

  @Post()
  @Roles(UserRole.DOCTOR)
  create(@Body() dto: CreateMedicalRecordDto ,@Req() req: Request & { user: { sub: string } }) {
    return this.service.create(dto,req.user.sub);
  }

  @Get()
  @Roles(UserRole.DOCTOR)
  findDoctorsAll(@Req() req: Request & { user: { sub: string } } ) {
    return this.service.findDoctorsAll(req.user.sub);
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.DOCTOR)
  findOne(@Param('id') id: string ,@Req() req: Request & { user: { sub: string } }) {
    return this.service.findOne(id ,req.user.sub);
  }

  @Put(':id')
  @Roles(UserRole.DOCTOR)

  update(@Param('id') id: string, @Body() dto: UpdateMedicalRecordDto ,@Req() req: Request & { user: { sub: string } }) {
    return this.service.update(id, dto ,req.user.sub);
  }

  @Delete(':id')
  @Roles(UserRole.DOCTOR)

  remove(@Param('id') id: string ,@Req() req: Request & { user: { sub: string } }) {
    return this.service.remove(id ,req.user.sub);
  }
}
