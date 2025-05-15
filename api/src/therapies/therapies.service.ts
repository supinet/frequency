import { Injectable } from '@nestjs/common';
import { TherapyDto } from './dto/therapy.dto';
import { UpdateTherapyDto } from './dto/update-therapy.dto';
import { PrismaService } from 'prisma/prisma.service';
import { generateUniqueName } from 'src/utils/generate-name-utils';
import { THERAPY_STATUS } from '@prisma/client';

@Injectable()
export class TherapiesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: TherapyDto) {
    const { id, name, status, year, ...data } = dto;
    let baseName = name?.trim() ?? 'New name';
    let finalYear = year ?? new Date().getFullYear();
    let finalStatus = status ?? THERAPY_STATUS.DRAFT;
    const finalName = await generateUniqueName(
      baseName,
      this.prisma.therapy,
      'name',
      {
        deleted: false,
        year: year,
      },
    );

    const therapy = await this.prisma.therapy.upsert({
      where: {
        id: id ?? 0,
      },
      update: dto,
      create: {
        ...data,
        name: finalName,
        status: finalStatus,
        year: finalYear,
      },
    });
    return therapy;
  }

  async findAll() {
    return await this.prisma.therapy.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} therapy`;
  }

  update(id: number, updateTherapyDto: UpdateTherapyDto) {
    return `This action updates a #${id} therapy`;
  }

  remove(id: number) {
    return `This action removes a #${id} therapy`;
  }
}
