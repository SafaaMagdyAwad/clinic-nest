import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDTO } from './dto/reset.dto';
import { ForgotPasswordDTO } from './dto/forgot.dto';
import { response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.usersService.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
        });

        return {
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        };
    }

    async login(dto: LoginDto) {
        //console.log(dto);
        
        const user = await this.usersService.findByEmail(dto.email);
        //user  user {
//   _id: new ObjectId('697f9da5afa6100fdb29985a'),
//   name: 'Dr Safaa',
//   email: 'doctor@example.com',
//   password: '123456',
//   role: 'doctor',
//   createdAt: 2026-02-01T18:38:29.814Z,
//   updatedAt: 2026-02-01T18:38:29.814Z,
//   __v: 0
// }
//         , response{
//     "message": "Invalid credentials",
//     "error": "Unauthorized",
//     "statusCode": 401
// }
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user._id, email: user.email, role: user.role };

        const token = await this.jwtService.signAsync(payload);

        return {
            message: 'Login success',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
    async forgotPassword(dto: ForgotPasswordDTO) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) throw new NotFoundException('User not found');

        // Create a short-lived JWT token for password reset (e.g., 15 minutes)
        const resetToken = await this.jwtService.signAsync(
            { sub: user._id },
            { expiresIn: '15m' },
        );

        // Here you should send the resetToken via email to the user
        // Example: sendEmail(user.email, resetToken)
        // You can also store it in the DB if you want to validate later

        return {
            message: 'Password reset link sent to email',
            resetToken, // remove this in production, only for dev/testing
        };
    }

    // ------------------ Reset Password ------------------
    async resetPassword(token: string, newPassword: string) {
        try {
            // Verify token
            const payload: any = await this.jwtService.verifyAsync(token);

            const user = await this.usersService.findById(payload.sub);
            if (!user) throw new NotFoundException('User not found');

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update user password
            await this.usersService.update(user._id.toString(), { password: hashedPassword });

            return { message: 'Password reset successfully' };
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired reset token');
        }
    }

}

