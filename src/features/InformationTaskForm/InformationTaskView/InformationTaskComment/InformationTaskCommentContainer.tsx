import { useAppDispatch } from 'hooks/reduxHooks'
import { deleteComment, editComment } from 'store/slices/boardSlice'

import { IComment, ITaskColumnData } from 'types/Board.interfaces'
import InformationTaskComment from './InformationTaskComment'

interface InformationTaskCommentContainerProps {
  comment: IComment
  activeTaskColumnData: ITaskColumnData
}

const InformationTaskCommentContainer = (
  props: InformationTaskCommentContainerProps
) => {
  const dispatch = useAppDispatch()

  return (
    <InformationTaskComment
      {...props}
      deleteComment={(commentChangeData) =>
        dispatch(deleteComment(commentChangeData))
      }
      editComment={(commentEditedData) =>
        dispatch(editComment(commentEditedData))
      }
    />
  )
}

export default InformationTaskCommentContainer
