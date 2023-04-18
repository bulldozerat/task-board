import { Avatar, Tooltip } from '@mui/material'

import { IBoardTask, ITaskColumnData } from 'types/Board.interfaces'
import styles from './BoardTask.module.scss'

interface BoardTaskProps {
  task: IBoardTask
  column: string
  openMainModalWithViewTaskForm: () => void
  setActiveTaskColumnData: (org0: ITaskColumnData) => void
  setDraggedTaskColumnData: (org0: ITaskColumnData) => void
}

function BoardTask(props: BoardTaskProps) {
  const {
    task,
    column,
    openMainModalWithViewTaskForm,
    setActiveTaskColumnData,
    setDraggedTaskColumnData
  } = props

  const boardTaskDragStart = (task: IBoardTask) => {
    const draggedTaskColumnData: ITaskColumnData = { task, column }

    setDraggedTaskColumnData(draggedTaskColumnData)
  }

  function boardTaskClick() {
    setActiveTaskColumnData({ task, column })
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
        <div>{task.taskNumber}</div>
        <div className={styles.boardTaskInfoWrapperRightSide}>
          <span>{task.priority}</span>
          <Avatar className={styles.boardTaskAvatar}>NA</Avatar>
        </div>
      </div>
    </div>
  )
}

export default BoardTask
