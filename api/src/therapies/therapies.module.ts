import { Module } from '@nestjs/common';
import { TherapiesService } from './therapies.service';
import { TherapiesController } from './therapies.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TherapiesController],
  providers: [TherapiesService],
})
export class TherapiesModule {}
