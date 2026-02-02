import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, IsOptional, IsArray, ArrayNotEmpty, IsUrl } from "class-validator";

export class CreateMedicalRecordDto {
  @IsNotEmpty({ message: 'appointmentId is required' })
  @ApiProperty({ example: '65c9f7b9b2f2d2d7a2b7f999' })
  @IsString()
  appointmentId: string;

  @IsNotEmpty({ message: 'Diagnosis is required' })
  @ApiProperty({ example: 'Patient has headache', required: false })
  @IsString()
  diagnosis: string;

  @IsNotEmpty({ message: 'Prescription is required' })
  @IsString()
  @ApiProperty({ example: 'Paracetamol 500mg', required: false })
  @MinLength(10, { message: 'Prescription must be at least 10 characters long' })
  prescription: string;

  @IsOptional()
  @IsArray({ message: 'Attachments must be an array' })
  @IsUrl({}, { each: true, message: 'Each attachment must be a valid URL' })
  attachments?: string[];
}
