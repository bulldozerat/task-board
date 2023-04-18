import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store/store'
import { v4 as uuidv4 } from 'uuid'

import {
  IBoardData,
  INewTaskFormData,
  IBoardTask,
  ITaskColumnData,
  IComment,
  ICommentChangeData
} from 'types/Board.interfaces'

interface IBoardState {
  draggedTaskColumnData: ITaskColumnData | undefined
  activeTaskColumnData: ITaskColumnData | undefined
  boardData: IBoardData
}

export const initialState: IBoardState = {
  draggedTaskColumnData: undefined,
  activeTaskColumnData: undefined,
  boardData: {
    todo: { column: 'todo', title: 'Todo', count: 0, tasks: [] },
    blocked: { column: 'blocked', title: 'Blocked', count: 0, tasks: [] },
    inProgress: {
      column: 'inProgress',
      title: 'In Progress',
      count: 0,
      tasks: []
    },
    testing: { column: 'testing', title: 'Testing', count: 0, tasks: [] },
    approved: { column: 'approved', title: 'Approved', count: 0, tasks: [] },
    done: { column: 'done', title: 'Done', count: 0, tasks: [] }
  }
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createTask(state, action: PayloadAction<INewTaskFormData>) {
      const { title, description, priority } = action.payload
      const newTask: IBoardTask = {
        id: uuidv4(),
        // TODO generate unique number
        taskNumber: `XXXX-${Math.floor(Math.random() * 9000 + 1000)}`,
        title,
        description,
        priority,
        comments: []
      }

      state.boardData.todo.count++
      state.boardData.todo.tasks.push(newTask)
    },
    deleteTask(state, action: PayloadAction<ITaskColumnData>) {
      const { column, task } = action.payload
      const taskCurrentColumnData = state.boardData[column]

      taskCurrentColumnData.count--
      taskCurrentColumnData.tasks = taskCurrentColumnData.tasks.filter(t => t.id !== task.id)
    },
    editTask(state, action: PayloadAction<ITaskColumnData>) {
      const { column, task } = action.payload
      const tasks = state.boardData[column].tasks
      const taskIndex = tasks.findIndex(t => t.id === task.id)

      tasks[taskIndex] = { ...tasks[taskIndex], ...task }
    },
    moveTask(state, action: PayloadAction<string>) {
      const taskNewColumn = action.payload
      const { column, task } = state.draggedTaskColumnData!

      const taskCurrentColumnData = state.boardData[column]
      const taskNewColumnData = state.boardData[taskNewColumn]

      taskCurrentColumnData.count--
      taskCurrentColumnData.tasks = taskCurrentColumnData.tasks.filter((t: IBoardTask) => t.id !== task.id)

      taskNewColumnData.count++
      taskNewColumnData.tasks.push(task)
    },
    addNewComment(state, action: PayloadAction<ICommentChangeData>) {
      const { taskId, taskColumn, newComment } = action.payload
      const comment: IComment = {
        id: uuidv4(),
        text: newComment!
      }

      state.boardData[taskColumn].tasks.forEach(t => {
        if (t.id === taskId) t.comments.unshift(comment)
      })
    },
    deleteComment(state, action: PayloadAction<ICommentChangeData>) {
      const { taskId, taskColumn, commentId } = action.payload
      const task = state.boardData[taskColumn].tasks.find(t => t.id === taskId)

      if ((task?.comments) !== undefined) {
        task.comments = task.comments.filter(comment => comment.id !== commentId)
      }
    },
    editComment(state, action: PayloadAction<ICommentChangeData>) {
      const { taskId, taskColumn, commentId, newComment } = action.payload
      const task = state.boardData[taskColumn].tasks.find(t => t.id === taskId)

      if ((task?.comments) !== undefined) {
        task.comments.forEach(comment => {
          if (comment.id === commentId) comment.text = newComment!
        })
      }
    },
    setActiveTaskColumnData(state, action: PayloadAction<ITaskColumnData>) {
      state.activeTaskColumnData = action.payload
    },
    setDraggedTaskColumnData(state, action: PayloadAction<ITaskColumnData>) {
      state.draggedTaskColumnData = action.payload
    }
  }
})

export const {
  createTask, deleteTask, editTask, moveTask, setActiveTaskColumnData, setDraggedTaskColumnData
} = boardSlice.actions
export const { addNewComment, deleteComment, editComment } = boardSlice.actions

export const selectBoardData = (state: RootState) => state.board.boardData
export const selectActiveTaskColumnData = (state: RootState) => {
  const { column, task } = state.board.activeTaskColumnData!
  const columnData: ITaskColumnData = {
    column,
    task: state.board.boardData[column].tasks.find(t => t.id === task.id)!
  }

  return columnData
}

export default boardSlice.reducer
