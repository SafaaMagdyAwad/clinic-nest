import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AvailabilityService } from './availability.service';
import { UpsertAvailabilityDto } from './dto/upsert-availability.dto';

import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles.guard';
import { UserRole } from '../users/schemas/user.schema';
import { Roles } from '../auth/roles.decorator';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('availability')
@ApiBearerAuth()
@Controller('availability')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  // doctor sets his own availability
  @ApiOperation({ summary: 'Upsert my availability (Doctor only)' })
  @ApiBody({ type: UpsertAvailabilityDto })
  @ApiResponse({ status: 200, description: 'Availability saved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Doctor only)' })
  @Put('me')
  @Roles(UserRole.DOCTOR)
  upsertMyAvailability(
    @Req() req: Request & { user: { sub: string } },
    @Body() dto: UpsertAvailabilityDto,
  ) {
    return this.availabilityService.upsert(req.user.sub, dto);
  }

  // doctor views his own availability
  @ApiOperation({ summary: 'Get my availability (Doctor only)' })
  @ApiResponse({ status: 200, description: 'Availability returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Doctor only)' })
  @Get('me')
  @Roles(UserRole.DOCTOR)
  getMyAvailability(@Req() req: Request & { user: { sub: string } }) {
    return this.availabilityService.getByDoctorId(req.user.sub);
  }

  // patient/admin/doctor can view doctor availability
  @ApiOperation({ summary: 'Get doctor availability by doctorId' })
  @ApiParam({ name: 'doctorId', example: '697fa05b518715edb058cb96' })
  @ApiResponse({ status: 200, description: 'Availability returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get('doctor/:doctorId')
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.DOCTOR)
  getDoctorAvailability(@Param('doctorId') doctorId: string) {
    return this.availabilityService.getByDoctorId(doctorId);
  }

  // doctor deletes his availability
  @ApiOperation({ summary: 'Delete my availability (Doctor only)' })
  @ApiResponse({ status: 200, description: 'Availability deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Doctor only)' })
  @Delete('me')
  @Roles(UserRole.DOCTOR)
  deleteMyAvailability(@Req() req: Request & { user: { sub: string } }) {
    return this.availabilityService.deleteByDoctorId(req.user.sub);
  }
}
