import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

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
}
