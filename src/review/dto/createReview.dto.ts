import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CreatePlatformDto } from 'src/platform/dto/createPlatform.dto';
import { Platform } from 'src/platform/platform.scheme';

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  score: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  platform: CreatePlatformDto;
}
