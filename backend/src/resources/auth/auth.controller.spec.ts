import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@/resources/auth/auth.controller';
import { AuthService } from '@/resources/auth/auth.service';
import { JwtAuthGuard } from '@/resources/auth/guards/jwt-auth.guard';
import { LoginDto } from '@/resources/auth/dto/login.dto';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: 'testSecret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
        Reflector,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const loginDto: LoginDto = { email: 'test.test@test.oui', password: 'password' };
      const token = { access_token: 'mockedAccessToken' };
      mockAuthService.login.mockResolvedValue(token);

      const result = await controller.login(loginDto);
      expect(result).toEqual(token);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('me', () => {
    it('should return the user info', async () => {
      const mockUser = { username: 'testUser', userId: 1 };
      const req = { user: mockUser };

      const jwtAuthGuard = new JwtAuthGuard(new Reflector());
      jest
        .spyOn(jwtAuthGuard, 'canActivate')
        .mockImplementationOnce((context: ExecutionContext) => {
          const ctx = context.switchToHttp();
          ctx.getRequest().user = mockUser;
          return true;
        });

      const result = await controller.me(req);
      expect(result).toEqual(mockUser);
    });
  });
});
