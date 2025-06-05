import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@/resources/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/resources/user/entities/user.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const usersArray = [
        { id: 1, username: 'User1' },
        { id: 2, username: 'User2' },
      ] as User[];
      jest.spyOn(repository, 'find').mockResolvedValue(usersArray);
      const result = await service.findAll();
      expect(result).toEqual(usersArray);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user = { id: 1, username: 'User1' } as User;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);
      const result = await service.findOne(1);
      expect(result).toEqual(user);
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const user = { id: 1, username: 'NewUser' } as User;
      jest.spyOn(repository, 'save').mockResolvedValue(user);
      const result = await service.create(user);
      expect(result).toEqual(user);
    });
  });

  describe('remove', () => {
    it('should delete a user by ID', async () => {
      const deleteSpy = jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);
      await service.remove(1);
      expect(deleteSpy).toHaveBeenCalledWith(1);
    });
  });
});
