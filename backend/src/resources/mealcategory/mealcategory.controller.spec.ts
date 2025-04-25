import { Test, TestingModule } from '@nestjs/testing';
import { MealcategoryController } from './mealcategory.controller';
import { MealcategoryService } from './mealcategory.service';

describe('MealcategoryController', () => {
  let controller: MealcategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealcategoryController],
      providers: [MealcategoryService],
    }).compile();

    controller = module.get<MealcategoryController>(MealcategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
