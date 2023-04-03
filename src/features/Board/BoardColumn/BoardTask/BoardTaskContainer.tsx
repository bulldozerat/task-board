import { useAppDispatch } from 'hooks/reduxHooks'
import {
  setActiveTaskClumnData,
  setDraggedTaskColumnData
} from 'store/slices/boardSlice'
import { openMainModalWithViewTaskForm } from 'store/slices/mainModalSlice'

import { IBoardTask } from 'types/Board.interfaces'
import BoardTask from './BoardTask'

interface BoardTaskContainerProps {
  task: IBoardTask
  column: string
}

const BoardTaskContainer = (props: BoardTaskContainerProps) => {
  const dispatch = useAppDispatch()

  return (
    <BoardTask
      {...props}
      setActiveTaskClumnData={(taskColumnData) =>
        dispatch(setActiveTaskClumnData(taskColumnData))
      }
      setDraggedTaskColumnData={(draggedTaskColumnData) =>
        dispatch(setDraggedTaskColumnData(draggedTaskColumnData))
      }
      openMainModalWithViewTaskForm={() =>
        dispatch(openMainModalWithViewTaskForm())
      }
    />
  )
}

export default BoardTaskContainer
