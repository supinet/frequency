import { Test, TestingModule } from '@nestjs/testing';
import { FrequenciesService } from './frequencies.service';

describe('FrequenciesService', () => {
  let service: FrequenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrequenciesService],
    }).compile();

    service = module.get<FrequenciesService>(FrequenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
