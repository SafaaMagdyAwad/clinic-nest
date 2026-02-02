import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDTO } from './dto/forgot.dto';
import { ResetPasswordDTO } from './dto/reset.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new patient account' })
  @ApiBody({ type: RegisterDto })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiOperation({ 
  summary: 'User Login',
  description: 'Credentials for testing:\n- Admin: adminsafaa@example.com / Admin@123\n- Doctor: doctor@example.com / 123456' 
})
  @ApiBody({ type: LoginDto })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Send reset password token to email' })
  @ApiBody({ type: ForgotPasswordDTO })
  forgot(@Body() dto: ForgotPasswordDTO) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using token' })
  @ApiQuery({ name: 'token', required: true, example: 'jwt-token-here' })
  @ApiBody({ type: ResetPasswordDTO })
  reset(
    @Query('token') token: string,
    @Body() dto: ResetPasswordDTO,
  ) {
    return this.authService.resetPassword(token, dto.password);
  }
}
