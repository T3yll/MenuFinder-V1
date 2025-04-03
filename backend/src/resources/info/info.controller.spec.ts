import { Test, TestingModule } from '@nestjs/testing';
import { InfoController } from '@/resources/info/info.controller';
import { InfoService } from '@/resources/info/info.service';
import { Info } from '@/resources/info/entities/info.entity';
import { CreateInfoDto } from '@/resources/info/dto/create-info.dto';
import { UpdateInfoDto } from '@/resources/info/dto/update-info.dto';

describe('InfoController', () => {
  let controller: InfoController;
  let service: InfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoController],
      providers: [
        {
          provide: InfoService,
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

    controller = module.get<InfoController>(InfoController);
    service = module.get<InfoService>(InfoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new info', async () => {
      const createInfoDto: CreateInfoDto = {
        label: 'Test Label',
        description: 'Test Description',
        content: 'Test Content',
        expirationDate: null, // ou une date si nécessaire
        isHidden: false,
        isPinned: false,
      };
      const result: Info = { id: 1, ...createInfoDto } as Info;

      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await controller.create(createInfoDto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of infos', async () => {
      const result: Info[] = [
        {
          id: 1,
          label: 'Label 1',
          description: 'Desc 1',
          content: 'Content 1',
        } as Info,
        {
          id: 2,
          label: 'Label 2',
          description: 'Desc 2',
          content: 'Content 2',
        } as Info,
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single info by ID', async () => {
      const result: Info = {
        id: 1,
        label: 'Label',
        description: 'Desc',
        content: 'Content',
      } as Info;

      jest.spyOn(service, 'findOne').mockResolvedValue(result);
      expect(await controller.findOne('1')).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update an existing info', async () => {
      const updateInfoDto: UpdateInfoDto = {
        label: 'Updated Label',
        description: 'Updated Desc',
      };
      const result: Info = { id: 1, ...updateInfoDto } as Info;

      jest.spyOn(service, 'update').mockResolvedValue(result);
      expect(await controller.update('1', updateInfoDto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should remove an info by ID', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
