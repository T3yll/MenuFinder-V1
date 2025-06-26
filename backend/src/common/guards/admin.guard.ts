import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '@/resources/user/user.service';
import { IS_ADMIN_REQUIRED_KEY } from '@/common/decorators/admin.decorator';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAdminRequired = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_REQUIRED_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isAdminRequired) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.userId) {
      throw new ForbiddenException('Accès interdit');
    }

    try {
      const userData = await this.userService.isAdmin(user.userId);
      
      if (!userData || !userData.bAdmin) {
        throw new ForbiddenException('Accès réservé aux administrateurs');
      }

      return true;
    } catch (error) {
      throw new ForbiddenException('Accès réservé aux administrateurs');
    }
  }
} 