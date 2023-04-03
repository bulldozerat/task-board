import { Avatar, Tooltip } from '@mui/material'

import { IBoardTask, ITaskColumnData } from 'types/Board.interfaces'
import styles from './BoardTask.module.scss'

interface BoardTaskProps {
  task: IBoardTask
  column: string
  openMainModalWithViewTaskForm: () => void
  setActiveTaskClumnData: (org0: ITaskColumnData) => void
  setDraggedTaskColumnData: (org0: ITaskColumnData) => void
}

function BoardTask(props: BoardTaskProps) {
  const {
    task,
    column,
    openMainModalWithViewTaskForm,
    setActiveTaskClumnData,
    setDraggedTaskColumnData
  } = props

  const boardTaskDragStart = (task: IBoardTask) => {
    const draggedTaskColumnData: ITaskColumnData = { task, column }

    setDraggedTaskColumnData(draggedTaskColumnData)
  }

  function boardTaskClick() {
    setActiveTaskClumnData({ task, column })
    openMainModalWithViewTaskForm()
  }

  return (
    <div
      className={styles.boardTask}
      draggable
      onClick={boardTaskClick}
      onDragStart={() => boardTaskDragStart(task)}>
      <Tooltip title={task.title} placement="top">
        <div className={styles.boardTaskTitle}>{task.title}</div>
      </Tooltip>
      <div className={styles.boardTaskInfoWrapper}>
        <span>{task.taskNumber}</span>
        <span>{task.priority}</span>
        <Avatar className={styles.boardTaskAvatar}>NA</Avatar>
      </div>
    </div>
  )
}

export default BoardTask
