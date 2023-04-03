export type TASK_PRIORITY = 'HIGH' | 'NORMAL' | 'LOW' | 'NONE'

export interface IBoardTask {
  id: string;
  taskNumber: string;
  title: string;
  description: string;
  priority: TASK_PRIORITY;
  comments: string[];
}

export interface IBoardTasksList {
  title: string
  column: string
  count: number
  tasks: IBoardTask[]
}

export interface INewTaskFormData {
  title: string;
  description: string;
  priority: TASK_PRIORITY;
}

export type IBoardData = Record<string, IBoardTasksList>

export interface ITaskColumnData {
  task: IBoardTask
  column: string
}
