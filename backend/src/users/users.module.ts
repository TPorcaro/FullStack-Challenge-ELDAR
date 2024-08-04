import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  providers: [UsersService, PrismaService, RolesGuard, JwtAuthGuard],
  controllers: [UsersController],
})
export class UsersModule {}
