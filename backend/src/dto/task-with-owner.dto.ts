export class TaskWithOwnerDto {
  id: number;
  title: string;
  description: string;
  userName: string;
  userId: string;
  constructor(task: any) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.userName = task.user ? task.user.email : 'Unassigned';
    this.userId = task.user ? task.user.id : null;
  }
}
