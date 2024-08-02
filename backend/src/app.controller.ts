import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';
import { PrismaService } from './prisma/prisma.service';
import { User } from '@prisma/client';

@Controller('data')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @Roles('USER', 'ADMIN')
  async getData() {
    return this.prisma.user.findMany();
  }

  @Post()
  @Roles('ADMIN')
  async createData(@Body() body: User) {
    return this.prisma.user.create({ data: body });
  }

  @Put(':id')
  @Roles('ADMIN')
  async updateData(@Param('id') id: string, @Body() body: User) {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: body,
    });
  }

  @Delete(':id')
  @Roles('ADMIN')
  async deleteData(@Param('id') id: string) {
    return this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }
}
