import { MinLength, IsNotEmpty } from 'class-validator';

export class ResetPasswordDTO {
  

  @MinLength(6)
  password: string;
}
