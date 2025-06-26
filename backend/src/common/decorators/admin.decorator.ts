import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_REQUIRED_KEY = 'isAdminRequired';
export const AdminOnly = () => SetMetadata(IS_ADMIN_REQUIRED_KEY, true); 