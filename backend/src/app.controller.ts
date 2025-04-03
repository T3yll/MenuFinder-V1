import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AppService } from '@/app.service';
import { JwtAuthGuard } from '@/resources/auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger
  ) {}

  readonly SERVICE = AppController.name;

  @ApiOperation({ summary: 'Get a hello message' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched hello message',
  })
  @Get()
  getHello(): string {
    this.logger.log('Say Hello World', this.SERVICE);
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Get a protected resource' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched protected resource',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtectedResource() {
    this.logger.log('Accessing protected resource', this.SERVICE);
    return { message: 'Ceci est une ressource protégée.' };
  }
}
