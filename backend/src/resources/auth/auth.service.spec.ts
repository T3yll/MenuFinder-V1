import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@/resources/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockedAccessToken'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = { username: 'testUser', userId: 1 };
      const result = await service.login(user);
      expect(result).toEqual({ access_token: 'mockedAccessToken' });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: user.username,
        sub: user.userId,
      });
    });
  });
});
