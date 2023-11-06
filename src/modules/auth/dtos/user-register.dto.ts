import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'phone number',
    example: 63440486,
    type: Number,
    minimum: 61000000,
    maximum: 65999999,
  })
  phone_number: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
