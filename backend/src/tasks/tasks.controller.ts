import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Put,
  Get,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from 'src/dto/tasks.dto';
import { TaskWithOwnerDto } from '../dto/task-with-owner.dto';
import { Role } from '../auth/role.enum';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles(Role.ADMIN)
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.tasksService.createTask(createTaskDto);
    } catch (error) {
      console.error('Error creating task:', error);
      throw new HttpException(
        'Error creating task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  async getTasks(): Promise<TaskWithOwnerDto[]> {
    try {
      return await this.tasksService.getTasks();
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw new HttpException(
        'Error getting tasks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteTask(@Param('id') id: number) {
    try {
      const result = await this.tasksService.deleteTask(id);
      if (!result) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      console.error('Error deleting task:', error);
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error deleting task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      const result = await this.tasksService.updateTask(id, updateTaskDto);
      if (!result) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error updating task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
