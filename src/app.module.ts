import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FrequenciesModule } from './frequencies/frequencies.module';
import { PrismaModule } from 'prisma/prisma.module';
import { TherapiesModule } from './therapies/therapies.module';

@Module({
  imports: [PrismaModule, FrequenciesModule, TherapiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
