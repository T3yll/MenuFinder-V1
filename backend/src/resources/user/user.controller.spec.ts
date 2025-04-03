import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@/resources/user/user.controller';
import { UserService } from '@/resources/user/user.service';
import { User } from '@/resources/user/entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const usersArray = [
        { id: 1, username: 'User1' },
        { id: 2, username: 'User2' },
      ] as User[];
      mockUserService.findAll.mockResolvedValue(usersArray);

      const result = await controller.findAll();
      expect(result).toEqual(usersArray);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user = { id: 1, username: 'User1' } as User;
      mockUserService.findOne.mockResolvedValue(user);

      const result = await controller.findOne('1');
      expect(result).toEqual(user);
      expect(mockUserService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user = { id: 1, username: 'NewUser' } as User;
      mockUserService.create.mockResolvedValue(user);

      const result = await controller.create(user);
      expect(result).toEqual(user);
      expect(mockUserService.create).toHaveBeenCalledWith(user);
    });
  });

  describe('remove', () => {
    it('should delete a user by ID', async () => {
      mockUserService.remove.mockResolvedValue(undefined);

      await controller.remove('1');
      expect(mockUserService.remove).toHaveBeenCalledWith(1);
    });
  });
});
