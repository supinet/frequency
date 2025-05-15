import { PartialType } from '@nestjs/swagger';
import { TherapyDto } from './therapy.dto';

export class UpdateTherapyDto extends PartialType(TherapyDto) {}
