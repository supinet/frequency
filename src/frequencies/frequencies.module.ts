import { Module } from '@nestjs/common';
import { FrequenciesService } from './frequencies.service';
import { FrequenciesController } from './frequencies.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FrequenciesController],
  providers: [FrequenciesService],
})
export class FrequenciesModule {}
