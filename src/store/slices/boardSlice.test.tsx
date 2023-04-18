import {
  activeTaskColumnData,
  commmentOne,
  taskOne,
  taskOneCommentChangeData
} from 'utils/testsDummyData'
import { INewTaskFormData, ITaskColumnData } from 'types/Board.interfaces'
import boardReducer, {
  initialState,
  createTask,
  deleteTask,
  editTask,
  moveTask,
  setActiveTaskColumnData,
  setDraggedTaskColumnData,
  addNewComment,
  deleteComment,
  editComment
} from './boardSlice'

const newTaskData: INewTaskFormData = {
  title: 'New Task Title',
  description: 'New Task Description',
  priority: 'HIGH'
}

describe('board reducer', () => {
  test('should handle initial state', () => {
    expect(boardReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('should handle createTask', () => {
    const actual = boardReducer(initialState, createTask(newTaskData))
    const { count, tasks } = actual.boardData.todo
    const addedTask = tasks[0]

    expect(count).toEqual(1)
    expect(addedTask.title).toEqual(newTaskData.title)
    expect(addedTask.description).toEqual(newTaskData.description)
    expect(addedTask.priority).toEqual(newTaskData.priority)
  })

  test('should handle deleteTask', () => {
    const deleteTaskState = {
      draggedTaskColumnData: undefined,
      activeTaskColumnData: {
        task: taskOne,
        column: 'blocked'
      },
      boardData: {
        blocked: {
          column: 'blocked',
          title: 'Blocked',
          count: 1,
          tasks: [taskOne]
        }
      }
    }

    const actual = boardReducer(
      deleteTaskState,
      deleteTask(deleteTaskState.activeTaskColumnData)
    )

    expect(actual.boardData.blocked.count).toEqual(0)
    expect(actual.boardData.blocked.tasks.length).toEqual(0)
  })

  test('should handle editTask', () => {
    const editTaskState = {
      draggedTaskColumnData: undefined,
      activeTaskColumnData: undefined,
      boardData: {
        blocked: {
          column: 'blocked',
          title: 'Blocked',
          count: 1,
          tasks: [taskOne]
        }
      }
    }

    const editedTaskColumnData: ITaskColumnData = {
      column: 'blocked',
      task: {
        ...taskOne,
        title: 'Edited task title',
        description: 'Edited task description',
        priority: 'NORMAL'
      }
    }

    const actual = boardReducer(editTaskState, editTask(editedTaskColumnData))
    const editedTask = actual.boardData.blocked.tasks[0]

    expect(editedTask.title).toEqual(editedTaskColumnData.task.title)
    expect(editedTask.description).toEqual(
      editedTaskColumnData.task.description
    )
    expect(editedTask.priority).toEqual(editedTaskColumnData.task.priority)
  })

  test('should handle moveTask', () => {
    const moveTaskState = {
      draggedTaskColumnData: {
        task: taskOne,
        column: 'blocked'
      },
      activeTaskColumnData: undefined,
      boardData: {
        blocked: {
          column: 'blocked',
          title: 'Blocked',
          count: 1,
          tasks: [taskOne]
        },
        done: {
          column: 'done',
          title: 'Done',
          count: 0,
          tasks: []
        }
      }
    }

    const actual = boardReducer(moveTaskState, moveTask('done'))
    const oldTaskColumn = actual.boardData.blocked
    const newTaskColumn = actual.boardData.done

    expect(oldTaskColumn.count).toEqual(0)
    expect(oldTaskColumn.tasks.length).toEqual(0)
    expect(newTaskColumn.count).toEqual(1)
    expect(newTaskColumn.tasks.length).toEqual(1)

    const movedTask = newTaskColumn.tasks[0]
    expect(movedTask.id).toEqual(moveTaskState.boardData.blocked.tasks[0].id)
  })

  describe('comments functionality', () => {
    test('should handle addNewComment', () => {
      const addNewCommentState = {
        draggedTaskColumnData: undefined,
        activeTaskColumnData: undefined,
        boardData: {
          todo: {
            column: 'todo',
            title: 'Todo',
            count: 1,
            tasks: [taskOne]
          }
        }
      }

      const actual = boardReducer(
        addNewCommentState,
        addNewComment(taskOneCommentChangeData)
      )
      const { comments } = actual.boardData.todo.tasks[0]

      expect(comments.length).toEqual(1)
      expect(comments[0].text).toEqual(taskOneCommentChangeData.newComment)
    })

    test('should handle deleteComment', () => {
      const deleteCommentState = {
        draggedTaskColumnData: undefined,
        activeTaskColumnData: undefined,
        boardData: {
          todo: {
            column: 'todo',
            title: 'Todo',
            count: 1,
            tasks: [
              { ...taskOne, comments: [...taskOne.comments, commmentOne] }
            ]
          }
        }
      }

      const actual = boardReducer(
        deleteCommentState,
        deleteComment(taskOneCommentChangeData)
      )

      const { comments } = actual.boardData.todo.tasks[0]
      expect(comments.length).toEqual(0)
    })

    test('should handle editComment', () => {
      const editCommentState = {
        draggedTaskColumnData: undefined,
        activeTaskColumnData: undefined,
        boardData: {
          todo: {
            column: 'todo',
            title: 'Todo',
            count: 1,
            tasks: [
              {
                ...taskOne,
                comments: [{ id: commmentOne.id, text: 'comment text' }]
              }
            ]
          }
        }
      }

      const actual = boardReducer(
        editCommentState,
        editComment(taskOneCommentChangeData)
      )

      const editedComment = actual.boardData.todo.tasks[0].comments[0]
      expect(editedComment.text).toEqual(taskOneCommentChangeData.newComment)
    })
  })

  test('should handle setActiveTaskClumnData', () => {
    const actual = boardReducer(
      initialState,
      setActiveTaskColumnData(activeTaskColumnData)
    )

    expect(actual.activeTaskColumnData).toEqual(activeTaskColumnData)
  })

  test('should handle setDraggedTaskColumnData', () => {
    const actual = boardReducer(
      initialState,
      setDraggedTaskColumnData(activeTaskColumnData)
    )

    expect(actual.draggedTaskColumnData).toEqual(activeTaskColumnData)
  })
})
