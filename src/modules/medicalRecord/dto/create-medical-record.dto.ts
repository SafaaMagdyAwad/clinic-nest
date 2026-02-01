import { IsNotEmpty, IsString, MinLength, IsOptional, IsArray, ArrayNotEmpty, IsUrl } from "class-validator";

export class CreateMedicalRecordDto {
  @IsNotEmpty({ message: 'appointmentId is required' })
  @IsString()
  appointmentId: string;

  @IsNotEmpty({ message: 'Diagnosis is required' })
  @IsString()
  diagnosis: string;

  @IsNotEmpty({ message: 'Prescription is required' })
  @IsString()
  @MinLength(10, { message: 'Prescription must be at least 10 characters long' })
  prescription: string;

  @IsOptional()
  @IsArray({ message: 'Attachments must be an array' })
  @IsUrl({}, { each: true, message: 'Each attachment must be a valid URL' })
  attachments?: string[];
}
