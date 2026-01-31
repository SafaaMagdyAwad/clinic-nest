import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@Controller('doctor')
export class DoctorController {
    constructor(private doctorService: DoctorService) { }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    create(@Body() dto: CreateDoctorDto) {
        return this.doctorService.create(dto);
    }
    @Get()
    getAll() {
        return this.doctorService.findAll();
    }
    @Get(':id')
    getById(
        @Param('id') id: string,
    ) {
        return this.doctorService.findOne(id);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN) 
    updateDoctor(
        @Param('id') id: string,
        @Body() dto: UpdateDoctorDto
    ) {
        return this.doctorService.updateDoctor(id, dto);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN) 
    @Delete(':id')
    deleteDoctor(
        @Param('id') id: string,
    ) {
        return this.doctorService.deleteDoctor(id);
    }





}
