import { v4 as uuidv4 } from 'uuid'
import styles from './Board.module.scss'
import { IBoardData } from 'types/Board.interfaces'

import BoardColumnContainer from './BoardColumn/BoardColumnContainer'

interface BoardProps {
  boardData: IBoardData
}

function Board({ boardData }: BoardProps) {
  return (
    <div className={styles.boardWrapper}>
      {Object.keys(boardData).map((boardDataKey) => (
        <BoardColumnContainer
          key={uuidv4()}
          boardColumnData={boardData[boardDataKey]}
        />
      ))}
    </div>
  )
}

export default Board
