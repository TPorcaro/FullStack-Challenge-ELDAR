import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new HttpException(
        'Error fetching users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(data: User): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const userWithHashedPassword = { ...data, password: hashedPassword };
      return await this.prisma.user.create({
        data: userWithHashedPassword,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(id: string, user: User, currentUser: User): Promise<User> {
    if (currentUser.id === parseInt(id) && currentUser.role !== user.role) {
      throw new HttpException(
        'Admins cannot change their own role',
        HttpStatus.FORBIDDEN,
      );
    }
    if (currentUser.id === parseInt(id) && currentUser.email !== user.email) {
      throw new HttpException(
        'Admins cannot change their own email',
        HttpStatus.FORBIDDEN,
      );
    }
    try {
      return await this.prisma.user.update({
        where: { id: parseInt(id) },
        data: user,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new HttpException(
        'Error updating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: string, currentUser: User): Promise<User> {
    if (currentUser.id === parseInt(id)) {
      throw new HttpException(
        'Admins cannot delete themselves',
        HttpStatus.FORBIDDEN,
      );
    }
    try {
      return await this.prisma.user.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new HttpException(
        'Error deleting user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
