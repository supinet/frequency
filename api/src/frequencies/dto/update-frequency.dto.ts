import { PartialType } from '@nestjs/swagger';
import { FrequencyDto } from './create-frequency.dto';

export class UpdateFrequencyDto extends PartialType(FrequencyDto) {}
