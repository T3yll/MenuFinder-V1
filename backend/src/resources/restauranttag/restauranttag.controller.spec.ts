import { Test, TestingModule } from '@nestjs/testing';
import { RestauranttagController } from './restauranttag.controller';
import { RestauranttagService } from './restauranttag.service';

describe('RestauranttagController', () => {
  let controller: RestauranttagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestauranttagController],
      providers: [RestauranttagService],
    }).compile();

    controller = module.get<RestauranttagController>(RestauranttagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
