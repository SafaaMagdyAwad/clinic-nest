import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { UserRole } from '../users/schemas/user.schema';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
    constructor(
        private usersService: UsersService,
    ) { }

    async findById(id:string) {
        //only admin can cretae new doctor
console.log(id);

        const user = await this.usersService.findById(id);
        if (!user) throw new NotFoundException('User not found');
        const { password, ...safeUser } = user.toObject();

        return {
            message: 'account fetched successfully',
            user: safeUser,
        };
    }
    async update(id: string, dto: UpdatePatientDto) {

        const user = await this.usersService.update(id, dto);
        if (!user) throw new NotFoundException('User not found');
        const { password, ...safeUser } = user.toObject();

        return {
            message: 'success',
            user: safeUser,
        };
    }
    async delete(id: string) {
        const user = await this.usersService.delete(id);
        if (!user) throw new NotFoundException('User not found');
        const { password, ...safeUser } = user.toObject();

        return {
            message: 'success',
            user: safeUser,
        };
    }
    async getPatientsByDoctor(doctorId: string) {
        //only admin can cretae new doctor
        // const users = await this.appointmentService.findAll({doctor:doctor});
        // if (!users) throw new NotFoundException('Users not found');
        return {
            message: 'depends on appointments not yet ready',
            // users:users
        };
    }
    async findOne(id: string) {
        const user = await this.usersService.findById(id);
        if (!user) throw new NotFoundException('User not found');
        if (user.role !== UserRole.USER) {
            throw new NotFoundException('Patient not found');
        }
        return {
            message: 'success',
            user: user,
        };
    }
    async findAll() {
        //only admin can cretae new doctor
        const filter = UserRole.USER;
        const users = await this.usersService.findAll(filter);
        if (!users) throw new NotFoundException('Users not found');
        return {
            message: 'success',
            users: users,
        };
    }

}

