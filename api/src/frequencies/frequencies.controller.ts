import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FrequenciesService } from './frequencies.service';
import { FrequencyDto } from './dto/create-frequency.dto';
import { UpdateFrequencyDto } from './dto/update-frequency.dto';

@Controller('frequencies')
export class FrequenciesController {
  constructor(private readonly frequenciesService: FrequenciesService) {}

  @Post()
  create(@Body() createFrequencyDto: FrequencyDto) {
    return this.frequenciesService.create(createFrequencyDto);
  }

  @Get()
  async findAll() {
    return await this.frequenciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frequenciesService.findOne(+id);
  }

  @Get('patient/:id/pdf')
  async getFrequencyPatientPdf(@Param('id') id: string, @Res() res: Response) {
    const pdfBuffer = await this.frequenciesService.getFrequencyPatientPdf(+id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="user-report-${id}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFrequencyDto: UpdateFrequencyDto,
  ) {
    return this.frequenciesService.update(+id, updateFrequencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frequenciesService.remove(+id);
  }
}
