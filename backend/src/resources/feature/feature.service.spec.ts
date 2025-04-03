import { Test, TestingModule } from '@nestjs/testing';
import { FeatureService } from '@/resources/feature/feature.service';
import { Repository } from 'typeorm';
import { Feature } from '@/resources/feature/feature.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateFeatureDto } from '@/resources/feature/dto/create-feature.dto';

describe('FeatureService', () => {
  let service: FeatureService;
  let repository: Repository<Feature>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeatureService,
        {
          provide: getRepositoryToken(Feature),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FeatureService>(FeatureService);
    repository = module.get<Repository<Feature>>(getRepositoryToken(Feature));
  });

  it('should create a new feature', async () => {
    const featureData: CreateFeatureDto = {
      label: 'newFeature',
      isEnabled: true,
    };
    const createdFeature = new Feature();
    Object.assign(createdFeature, { id: 1, ...featureData });

    // Mock the repository's create method to return the created feature
    jest.spyOn(repository, 'create').mockReturnValue(createdFeature);
    // Mock the repository's save method to return the created feature
    jest.spyOn(repository, 'save').mockResolvedValue(createdFeature);

    const result = await service.create(featureData);
    expect(result).toEqual(createdFeature);
    expect(repository.create).toHaveBeenCalledWith(featureData); // Vérifiez que create a été appelé avec le bon paramètre
    expect(repository.save).toHaveBeenCalledWith(createdFeature); // Vérifiez que save a été appelé avec le bon paramètre
  });

  it('should find all features', async () => {
    const features = [
      { id: 1, label: 'feature1', isEnabled: true },
      { id: 2, label: 'feature2', isEnabled: false },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(features);

    const result = await service.findAll();
    expect(result).toEqual(features);
  });

  it('should find disabled features', async () => {
    const disabledFeature = {
      id: 2,
      label: 'disabledFeature',
      isEnabled: false,
    };

    jest.spyOn(repository, 'find').mockResolvedValue([disabledFeature]);

    const result = await service.findDisabledFeatures();
    expect(result).toEqual([disabledFeature]);
  });

  it('should find a feature by id', async () => {
    const feature = { id: 1, label: 'feature1', isEnabled: true };

    jest.spyOn(repository, 'findOne').mockResolvedValue(feature);

    const result = await service.findOne(1);
    expect(result).toEqual(feature);
  });

  it('should throw NotFoundException if feature not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update a feature', async () => {
    const existingFeature = { id: 1, label: 'feature1', isEnabled: false };
    const updatedFeature = { id: 1, label: 'feature1', isEnabled: true };

    jest.spyOn(service, 'findOne').mockResolvedValue(existingFeature);
    jest.spyOn(repository, 'save').mockResolvedValue(updatedFeature);

    const result = await service.update(1, { isEnabled: true });
    expect(result).toEqual(updatedFeature);
    expect(repository.save).toHaveBeenCalledWith({
      ...existingFeature,
      isEnabled: true,
    });
  });

  it('should remove a feature by id', async () => {
    const featureToRemove = { id: 1, label: 'feature1', isEnabled: true };

    jest.spyOn(service, 'findOne').mockResolvedValue(featureToRemove);
    jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

    await service.remove(1);
    expect(repository.remove).toHaveBeenCalledWith(featureToRemove);
  });

  it('should set feature state if feature exists', async () => {
    const existingFeature = {
      id: 1,
      label: 'existingFeature',
      isEnabled: false,
    };
    const updatedFeature = { id: 1, label: 'existingFeature', isEnabled: true };

    jest.spyOn(repository, 'findOne').mockResolvedValue(existingFeature);
    jest.spyOn(repository, 'save').mockResolvedValue(updatedFeature);

    const result = await service.setFeatureState('existingFeature', true);
    expect(result).toEqual(updatedFeature);
    expect(repository.save).toHaveBeenCalledWith(updatedFeature);
  });

  it('should create a feature if it does not exist in setFeatureState', async () => {
    const newFeature = { label: 'newFeature', isEnabled: true };
    const createdFeature = { id: 1, label: 'newFeature', isEnabled: true };

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'create').mockReturnValue(newFeature as Feature);
    jest.spyOn(repository, 'save').mockResolvedValue(createdFeature);

    const result = await service.setFeatureState('newFeature', true);
    expect(result).toEqual(createdFeature);
    expect(repository.create).toHaveBeenCalledWith(newFeature);
    expect(repository.save).toHaveBeenCalledWith(newFeature);
  });
});
