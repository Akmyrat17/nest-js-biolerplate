import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    description: 'phone number',
    example: 63440486,
    type: Number,
    minimum: 61000000,
    maximum: 65999999,
  })
  phone_number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
