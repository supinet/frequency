import { Test, TestingModule } from '@nestjs/testing';
import { TherapiesService } from './therapies.service';

describe('TherapiesService', () => {
  let service: TherapiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TherapiesService],
    }).compile();

    service = module.get<TherapiesService>(TherapiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
