import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles.guard';
import { PatientService } from './patient.service';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientController {
    constructor(private patientService: PatientService) { }
    @Roles(UserRole.USER)
    @Get('me')
    getMyProfile(@Req() req: Request & { user: { sub: string } }) {
        console.log("controller", req.user.sub);

        return this.patientService.findById(req.user.sub);
    }

    @Roles(UserRole.USER)
    @Patch('me')
    updateMyProfile(@Req() req: Request & { user: { sub: string } }, @Body() dto: UpdatePatientDto) {
        return this.patientService.update(req.user.sub, dto);
    }

    @Roles(UserRole.USER)
    @Delete('me')
    deleteMyProfile(@Req() req: Request & { user: { sub: string } }) {
        return this.patientService.delete(req.user.sub);
    }

    // ---------------- DOCTOR ----------------
    @Roles(UserRole.DOCTOR)
    @Get("doctor")//all doctors patients
    getMyPatients(@Req() req: Request & { user: { sub: string } }) {
        return this.patientService.getPatientsByDoctor(req.user.sub);
    }



    // ---------------- ADMIN ----------------
    @Roles(UserRole.ADMIN)
    @Get()
    getAllUsers() {
        return this.patientService.findAll();
    }


    @Roles(UserRole.ADMIN)
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.patientService.delete(id);
    }
    // ------------ ADMIN&DOCTOR -------------
    @Roles(UserRole.DOCTOR, UserRole.ADMIN)
    @Get(':id') //get patient by iD doctor , admin can
    getPatientById(@Param('id') id: string) {
        return this.patientService.findOne(id);
    }

}
