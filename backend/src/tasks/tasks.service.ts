import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskWithOwnerDto } from '../dto/task-with-owner.dto';
import { CreateTaskDto, UpdateTaskDto } from 'src/dto/tasks.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.prisma.task.create({
        data: createTaskDto,
      });
    } catch (error) {
      console.error('Error creating task:', error);
      throw new HttpException(
        'Error creating task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTasks(): Promise<TaskWithOwnerDto[]> {
    try {
      const tasks = await this.prisma.task.findMany({
        include: {
          user: true,
        },
      });
      return tasks.map((task) => new TaskWithOwnerDto(task));
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw new HttpException(
        'Error getting tasks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteTask(id: number): Promise<Task> {
    try {
      const task = await this.prisma.task.delete({
        where: { id },
      });
      return task;
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma specific error code for not found
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      console.error('Error deleting task:', error);
      throw new HttpException(
        'Error deleting task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskWithOwnerDto> {
    try {
      const task = await this.prisma.task.update({
        where: { id: Number(id) },
        data: updateTaskDto,
        include: {
          user: true,
        },
      });
      return new TaskWithOwnerDto(task);
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma specific error code for not found
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      console.log(error);
      throw new HttpException(
        'Error updating task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
