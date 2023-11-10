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

  @IsNotEmpty({ message: 'password is required', always: true })
  @IsString({ message: 'password must be a string' })
  @ApiProperty({ example: 'password', description: 'user password' })
  password: string;

  @IsNotEmpty({ message: 'username is required', always: true })
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  username: string;
}
