import { useAppSelector } from 'hooks/reduxHooks'
import { selectBoardData } from 'store/slices/boardSlice'

import Board from './Board'

function BoardContainer() {
  const boardData = useAppSelector(selectBoardData)

  return <Board boardData={boardData} />
}

export default BoardContainer
