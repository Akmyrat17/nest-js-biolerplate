import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: '63457896', description: 'phone number' })
  @IsNotEmpty()
  @IsNumber()
  phone_number: number;

  @ApiProperty({ example: 'password', description: 'user password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
