import { useAppDispatch } from 'hooks/reduxHooks'
import { moveTask } from 'store/slices/boardSlice'

import { IBoardTasksList } from 'types/Board.interfaces'
import BoardColumn from './BoardColumn'

interface BoardColumnContainerProps {
  boardColumnData: IBoardTasksList
}

function BoardColumnContainer(props: BoardColumnContainerProps) {
  const dispatch = useAppDispatch()

  return (
    <BoardColumn
      {...props}
      moveTask={(newColumn) => dispatch(moveTask(newColumn))}
    />
  )
}

export default BoardColumnContainer
