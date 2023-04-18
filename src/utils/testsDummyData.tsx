import {
  IBoardTask,
  IBoardTasksList,
  IComment,
  ICommentChangeData,
  ITaskColumnData
} from 'types/Board.interfaces'

export const taskOne: IBoardTask = {
  id: '8674c028-8bfd-4469-a69d-aae2c4b78fd2',
  taskNumber: 'XXXX-3435',
  title: 'Task One',
  description: 'Some descr task one',
  priority: 'LOW',
  comments: []
}

export const taskTwo: IBoardTask = {
  id: '9074c028-5555-4469-7777-aae2c4b78f67',
  taskNumber: 'XXXX-5678',
  title: 'Task Two',
  description: 'Some descr task two',
  priority: 'HIGH',
  comments: []
}

export const tasks: IBoardTask[] = [taskOne, taskTwo]

export const boardColumnData: IBoardTasksList = {
  title: 'Todo',
  column: 'todo',
  count: 2,
  tasks
}

export const boardColumnDataTwo: IBoardTasksList = {
  title: 'Done',
  column: 'done',
  count: 2,
  tasks
}

export const activeTaskColumnData: ITaskColumnData = {
  task: taskTwo,
  column: 'todo'
}

export const commmentOne: IComment = {
  id: '0004c028-xxxx-7777-kkkk-aae2c4b78333',
  text: 'Lorem Ipsum comment text'
}

export const taskOneCommentChangeData: ICommentChangeData = {
  taskId: taskOne.id,
  taskColumn: 'todo',
  commentId: commmentOne.id,
  newComment: commmentOne.text
}
