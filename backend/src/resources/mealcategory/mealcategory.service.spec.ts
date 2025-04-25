import { Test, TestingModule } from '@nestjs/testing';
import { MealcategoryService } from './mealcategory.service';

describe('MealcategoryService', () => {
  let service: MealcategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealcategoryService],
    }).compile();

    service = module.get<MealcategoryService>(MealcategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
