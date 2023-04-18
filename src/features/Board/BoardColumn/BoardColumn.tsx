import { IBoardTasksList } from 'types/Board.interfaces'
import styles from './BoardColumn.module.scss'
import BoardTaskContainer from './BoardTask/BoardTaskContainer'

interface BoardColumnProps {
  boardColumnData: IBoardTasksList
  moveTask: (newColumn: string) => void
}

function BoardColumn({ boardColumnData, moveTask }: BoardColumnProps) {
  const { title, count, tasks, column } = boardColumnData

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    moveTask(column)
  }

  return (
    <div
      className={styles.boardColumn}
      onDrop={handleDrop}
      onDragOver={handleDragOver}>
      <h2 className={styles.boardColumnTitle}>
        {title} {count}
      </h2>
      {tasks.map((task) => (
        <BoardTaskContainer key={task.id} task={task} column={column} />
      ))}
    </div>
  )
}

export default BoardColumn
