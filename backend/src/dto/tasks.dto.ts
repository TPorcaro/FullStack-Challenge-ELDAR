import { IsInt, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId?: number;
}
export class CreateTaskDto extends UpdateTaskDto {
  title: string;
  description: string;
}
