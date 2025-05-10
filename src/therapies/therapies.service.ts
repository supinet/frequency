import { Injectable } from '@nestjs/common';
import { TherapyDto } from './dto/therapy.dto';
import { UpdateTherapyDto } from './dto/update-therapy.dto';
import { PrismaService } from 'prisma/prisma.service';
import { generateUniqueName } from 'src/utils/generate-name-utils';

@Injectable()
export class TherapiesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: Partial<TherapyDto>) {
    const { id, name, ...data } = dto;
    let baseName = name?.trim() ?? 'New name';
    const finalName = await generateUniqueName(
      baseName,
      this.prisma.therapy,
      'name',
      {
        deleted: false,
      },
    );

    const therapy = await this.prisma.therapy.upsert({
      where: {
        id: id ?? 0,
      },
      update: id ? { ...data, name: finalName } : {},
      create: {
        ...data,
        name: finalName,
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
