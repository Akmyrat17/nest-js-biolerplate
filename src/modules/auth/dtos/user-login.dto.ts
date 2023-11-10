import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    description: 'phone number',
    example: 845554545,
    type: Number,
    minimum: 61000000,
    maximum: 65999999,
  })
  phone_number: number;

  @ApiProperty({ example: '5845845' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
