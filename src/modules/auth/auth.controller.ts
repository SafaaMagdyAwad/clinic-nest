import { Body, Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDTO } from './dto/forgot.dto';
import { ResetPasswordDTO } from './dto/reset.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
    @Post('forgot-password')
    forgot(@Body() dto: ForgotPasswordDTO) {
        return this.authService.forgotPassword(dto);
    }
    @Post('reset-password')
    reset(
        @Query('token') token: string,        // token from URL
        @Body() dto: ResetPasswordDTO,        // password from body
    ) {
        return this.authService.resetPassword(token, dto.password);
    }

}
