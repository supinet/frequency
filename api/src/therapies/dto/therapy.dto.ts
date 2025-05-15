import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from '@nestjs/class-validator';
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { THERAPY_STATUS } from '@prisma/client';

export class TherapyDto {
  @ApiProperty()
  @IsNumber()
  @Optional()
  id?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Optional()
  name?: string;

  @ApiProperty()
  @IsEnum(THERAPY_STATUS)
  @Optional()
  status: THERAPY_STATUS;

  @ApiProperty()
  @IsNumber()
  @Optional()
  year: number;
}
