import { Test, TestingModule } from '@nestjs/testing';
import { RestauranttagService } from './restauranttag.service';

describe('RestauranttagService', () => {
  let service: RestauranttagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestauranttagService],
    }).compile();

    service = module.get<RestauranttagService>(RestauranttagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
