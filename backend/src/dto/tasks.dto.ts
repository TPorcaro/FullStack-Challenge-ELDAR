export class CreateTaskDto {
  name: string;
  ownerId?: number;
}
export class UpdateTaskDto {
  ownerId?: number;
}
