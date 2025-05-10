import { Injectable } from '@nestjs/common';
import { CreateFrequencyDto } from './dto/create-frequency.dto';
import { UpdateFrequencyDto } from './dto/update-frequency.dto';
import { PrismaService } from 'prisma/prisma.service';
import { getAllTherapies } from '@prisma/client/sql';
import * as puppeteer from 'puppeteer';

@Injectable()
export class FrequenciesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFrequencyDto: CreateFrequencyDto) {
    return 'This action adds a new frequency';
  }

  async findAll() {
    return await this.prisma.$queryRawTyped(getAllTherapies());
  }

  async getFrequencyPatientPdf(id: number): Promise<Buffer> {
    const userTherapy = await this.prisma.userTherapy.findUnique({
      where: { id: id },
      include: { therapy: true, patient: true, tutor: true },
    });
    const html = `
      <html>
        <head><style>body { font-family: Arial; }</style></head>
        <body>
          <h1>Patient: ${userTherapy?.patient.name}</h1>
          <p>Tutor: ${userTherapy?.tutor.name}</p>
          <h2>Therapies</h2>
          <ul>
            ${userTherapy?.therapy.name}
          </ul>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({ headless: 'shell' });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    const pdfUnit8Array = await page.pdf({ format: 'A4' });
    const pdfBuffer = Buffer.from(pdfUnit8Array);
    await browser.close();

    return pdfBuffer;
  }

  async findOne(id: number) {
    throw new Error('Method not implemented.');
  }

  update(id: number, updateFrequencyDto: UpdateFrequencyDto) {
    return `This action updates a #${id} frequency`;
  }

  remove(id: number) {
    return `This action removes a #${id} frequency`;
  }
}
