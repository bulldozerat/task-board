import { useAppDispatch } from 'hooks/reduxHooks'
import { addNewComment } from 'store/slices/boardSlice'

import { ITaskColumnData } from 'types/Board.interfaces'
import InformationTaskView from './InformationTaskView'

interface InformationTaskViewContainerProps {
  activeTaskColumnData: ITaskColumnData
}

const InformationTaskViewContainer = (
  props: InformationTaskViewContainerProps
) => {
  const dispatch = useAppDispatch()

  return (
    <InformationTaskView
      {...props}
      addNewComment={(addNewCommentData) =>
        dispatch(addNewComment(addNewCommentData))
      }
    />
  )
}

export default InformationTaskViewContainer
