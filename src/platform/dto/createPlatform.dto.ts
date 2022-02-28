import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlatformDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
