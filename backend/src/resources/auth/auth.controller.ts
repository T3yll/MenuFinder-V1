import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@/resources/auth/auth.service';
import { LoginDto } from '@/resources/auth/dto/login.dto';
import { JwtAuthGuard } from '@/resources/auth/guards/jwt-auth.guard';
import { Public } from '@/common/decorators/security/public.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully logged in',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password
    );
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Get authenticated user information' })
  @ApiResponse({
    status: 200,
    description: 'Returns the authenticated user',
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    const userId = req.user.userId; // Récupère l'ID utilisateur depuis le JWT
    const user = await this.userService.findOne(userId); // Utilise l'instance du service User
    return user;
  }
}
