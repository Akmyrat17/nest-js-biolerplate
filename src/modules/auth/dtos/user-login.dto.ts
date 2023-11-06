import { ApiProperty } from '@nestjs/swagger';

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
  password: string;
}
