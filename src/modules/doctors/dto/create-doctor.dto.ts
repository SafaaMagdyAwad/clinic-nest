import { 
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    MinLength 
} from 'class-validator';
export class CreateDoctorDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

 
  
}