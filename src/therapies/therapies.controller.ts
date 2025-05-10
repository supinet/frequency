import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TherapiesService } from './therapies.service';
import { TherapyDto } from './dto/therapy.dto';
import { UpdateTherapyDto } from './dto/update-therapy.dto';

@Controller('therapies')
export class TherapiesController {
  constructor(private readonly therapiesService: TherapiesService) {}

  @Post()
  async create(@Body() therapyDto: TherapyDto) {
    return await this.therapiesService.create(therapyDto);
  }

  @Get()
  async findAll() {
    return await this.therapiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.therapiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTherapyDto: UpdateTherapyDto) {
    return this.therapiesService.update(+id, updateTherapyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.therapiesService.remove(+id);
  }
}
