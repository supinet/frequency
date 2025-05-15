import { Test, TestingModule } from '@nestjs/testing';
import { TherapiesController } from './therapies.controller';
import { TherapiesService } from './therapies.service';

describe('TherapiesController', () => {
  let controller: TherapiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TherapiesController],
      providers: [TherapiesService],
    }).compile();

    controller = module.get<TherapiesController>(TherapiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
