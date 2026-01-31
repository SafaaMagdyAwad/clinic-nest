import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UserRole } from '../users/schemas/user.schema';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { string } from 'joi';

@Injectable()
export class DoctorService {
    constructor(
        private usersService: UsersService,
    ) { }

    async create(dto: CreateDoctorDto) {
        //only admin can cretae new doctor
        console.log(dto, "dto");

        const user = await this.usersService.create({
            name: dto.name,
            email: dto.email,
            password: dto.password,
            role: UserRole.DOCTOR,
        });

        return {
            message: 'Doctor created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
    async findAll() {
        //only admin can cretae new doctor
        const filter = "doctor";
        const users = await this.usersService.findAll(filter);
        if (!users) throw new NotFoundException('Users not found');
        return {
            message: 'success',
            users: users,
        };
    }
    async findOne(id: string) {
        const user = await this.usersService.findById(id);
        if (!user) throw new NotFoundException('User not found');
        if (user.role !== 'doctor') {
            throw new NotFoundException('Doctor not found');
        }
        return {
            message: 'success',
            user: user,
        };
    }
    async updateDoctor(id: string, dto: UpdateDoctorDto) {
        //only admin can cretae new doctor

        const user = await this.usersService.update(id, dto);
        if (!user) throw new NotFoundException('Users not found');
        return {
            message: 'success',
            user: user,
        };
    }
    async deleteDoctor(id: string) {
       

        const user = await this.usersService.delete(id);
        if (!user) throw new NotFoundException('Users not found');
        const { password, ...safeUser } = user.toObject();

        return {
            message: 'success',
            user: safeUser,
        };
    }



}

