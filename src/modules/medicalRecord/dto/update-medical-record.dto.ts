import {  ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength, IsArray, IsUrl } from "class-validator";

export class UpdateMedicalRecordDto {
  @IsOptional()
  @IsString({ message: 'Diagnosis must be a string' })
  @ApiPropertyOptional({ example: 'Patient has headache', required: false })
  diagnosis?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'Paracetamol 500mg', required: false })
  @IsString({ message: 'Prescription must be a string' })
  @MinLength(10, { message: 'Prescription must be at least 10 characters long' })
  prescription?: string;

  @IsOptional()
  @IsArray({ message: 'Attachments must be an array' })
  @IsUrl({}, { each: true, message: 'Each attachment must be a valid URL' })
  attachments?: string[];
}
