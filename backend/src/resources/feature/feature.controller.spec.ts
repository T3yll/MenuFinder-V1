import { Test, TestingModule } from '@nestjs/testing';
import { FeatureController } from '@/resources/feature/feature.controller';
import { FeatureService } from '@/resources/feature/feature.service';
import { CreateFeatureDto } from '@/resources/feature/dto/create-feature.dto';
import { UpdateFeatureDto } from '@/resources/feature/dto/update-feature.dto';
import { Feature } from '@/resources/feature/feature.entity';

describe('FeatureController', () => {
  let controller: FeatureController;
  let service: FeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureController],
      providers: [
        {
          provide: FeatureService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FeatureController>(FeatureController);
    service = module.get<FeatureService>(FeatureService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new feature', async () => {
      const createFeatureDto: CreateFeatureDto = {
        label: 'New Feature',
        isEnabled: true,
      };
      const feature = { id: 1, ...createFeatureDto } as Feature;

      jest.spyOn(service, 'create').mockResolvedValue(feature);
      const result = await controller.create(createFeatureDto);
      expect(result).toEqual(feature);
      expect(service.create).toHaveBeenCalledWith(createFeatureDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of features', async () => {
      const featuresArray = [
        { id: 1, label: 'Feature 1', isEnabled: true },
        { id: 2, label: 'Feature 2', isEnabled: false },
      ] as Feature[];

      jest.spyOn(service, 'findAll').mockResolvedValue(featuresArray);
      const result = await controller.findAll();
      expect(result).toEqual(featuresArray);
    });
  });

  describe('findOne', () => {
    it('should return a feature by ID', async () => {
      const feature = { id: 1, label: 'Feature 1', isEnabled: true } as Feature;

      jest.spyOn(service, 'findOne').mockResolvedValue(feature);
      const result = await controller.findOne('1');
      expect(result).toEqual(feature);
    });
  });

  describe('update', () => {
    it('should update a feature', async () => {
      const updateFeatureDto: UpdateFeatureDto = { isEnabled: false };
      const feature = { id: 1, label: 'Feature 1', isEnabled: false } as Feature;

      jest.spyOn(service, 'update').mockResolvedValue(feature);
      const result = await controller.update('1', updateFeatureDto);
      expect(result).toEqual(feature);
      expect(service.update).toHaveBeenCalledWith(1, updateFeatureDto);
    });
  });

  describe('remove', () => {
    it('should remove a feature', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
