import { Test, TestingModule } from '@nestjs/testing';
import { InfoService } from '@/resources/info/info.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Info } from '@/resources/info/entities/info.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('InfoService', () => {
  let service: InfoService;
  let repository: Repository<Info>;

  const mockInfoRepository = () => ({
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InfoService,
        {
          provide: getRepositoryToken(Info),
          useFactory: mockInfoRepository,
        },
      ],
    }).compile();

    service = module.get<InfoService>(InfoService);
    repository = module.get<Repository<Info>>(getRepositoryToken(Info));
  });

  describe('remove', () => {
    it('should remove an info by ID', async () => {
      const info = { id: 1, label: 'Test', description: 'Test Description' };
      repository.findOneBy = jest.fn().mockResolvedValue(info);
      repository.delete = jest.fn().mockResolvedValue({ affected: 1 });

      await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(info.id);
    });

    it('should throw NotFoundException if info to delete is not found', async () => {
      repository.findOneBy = jest.fn().mockResolvedValue(null); // Simule un ID non trouvé

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
