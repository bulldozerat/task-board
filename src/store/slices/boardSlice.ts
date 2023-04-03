import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store/store'
import { v4 as uuidv4 } from 'uuid'

import {
  IBoardData,
  INewTaskFormData,
  IBoardTask,
  ITaskColumnData
} from 'types/Board.interfaces'

interface IBoardState {
  draggedTaskColumnData: ITaskColumnData | undefined
  activeTaskColumnData: ITaskColumnData | undefined
  boardData: IBoardData
}

const initialState: IBoardState = {
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
    deleteTask(state) {
      if (state.activeTaskColumnData === undefined) throw new Error('A problem occured')

      const taskCurrentColumnData = state.boardData[state.activeTaskColumnData.column]
      taskCurrentColumnData.count--
      taskCurrentColumnData.tasks =
        taskCurrentColumnData.tasks.filter(t => t.id !== state.activeTaskColumnData?.task.id)
    },
    editTask(state, action: PayloadAction<ITaskColumnData>) {
      const { column, task } = action.payload
      const allColumnTasks = state.boardData[column].tasks
      const taskIndex = allColumnTasks.findIndex(t => t.id === task.id)

      allColumnTasks[taskIndex] = { ...allColumnTasks[taskIndex], ...task }
    },
    moveTask(state, action: PayloadAction<string>) {
      const taskNewColumn = action.payload
      const { column, task } = state.draggedTaskColumnData as ITaskColumnData

      const taskCurrentColumnData = state.boardData[column]
      const taskNewColumnData = state.boardData[taskNewColumn]

      taskCurrentColumnData.count--
      taskCurrentColumnData.tasks = taskCurrentColumnData.tasks.filter((t: IBoardTask) => t.id !== task.id)

      taskNewColumnData.count++
      taskNewColumnData.tasks.push(task)
    },
    setActiveTaskClumnData(state, action: PayloadAction<ITaskColumnData>) {
      state.activeTaskColumnData = action.payload
    },
    setDraggedTaskColumnData(state, action: PayloadAction<ITaskColumnData>) {
      state.draggedTaskColumnData = action.payload
    }
  }
})

export const {
  createTask, deleteTask, editTask, moveTask, setActiveTaskClumnData, setDraggedTaskColumnData
} = boardSlice.actions

export const selectBoardData = (state: RootState) => state.board.boardData
export const selectActiveTaskColumnData = (state: RootState) => state.board.activeTaskColumnData

export default boardSlice.reducer
