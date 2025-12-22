import { TaskPriorityEnum } from "./enums/TaskPriorityEnum.js";

class TaskEntity {
  constructor(
    private id: string,
    private user_id: string,
    private title: string,
    private description: string,
    private priority: TaskPriorityEnum,
    private complete: boolean,
    private repeat: boolean,
    private created_at: Date,
    private update_at: Date,
  ) {}
}

export { TaskEntity };
