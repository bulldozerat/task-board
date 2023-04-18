import { useState } from 'react'
import { TextField, Tooltip } from '@mui/material'
import { ModeEdit, Delete, Cancel, PostAdd } from '@mui/icons-material'

import styles from './InformationTaskComment.module.scss'
import {
  IComment,
  ICommentChangeData,
  ITaskColumnData
} from 'types/Board.interfaces'

interface InformationTaskCommentProps {
  comment: IComment
  activeTaskColumnData: ITaskColumnData
  deleteComment: (arg0: ICommentChangeData) => void
  editComment: (arg0: ICommentChangeData) => void
}

const InformationTaskComment = (props: InformationTaskCommentProps) => {
  const { comment, activeTaskColumnData, deleteComment, editComment } = props
  const { id, text } = comment

  const [commentText, setCommentText] = useState(text)
  const [isEditCommentDisabled, setIsEditCommentDisabled] = useState(true)

  function deleteCommentClickHandler() {
    const commentChangeData: ICommentChangeData = {
      taskId: activeTaskColumnData.task.id,
      taskColumn: activeTaskColumnData.column,
      commentId: id
    }

    deleteComment(commentChangeData)
  }

  function cancelCommentHandler() {
    setCommentText(text)
    setIsEditCommentDisabled(true)
  }

  function editCommentClickHandler() {
    const commentEditedData: ICommentChangeData = {
      taskId: activeTaskColumnData.task.id,
      taskColumn: activeTaskColumnData.column,
      commentId: id,
      newComment: commentText
    }

    editComment(commentEditedData)
    setIsEditCommentDisabled(true)
  }

  return (
    <div className={styles.commentWrapper}>
      <TextField
        value={commentText}
        label="Comment"
        fullWidth
        multiline
        minRows="2"
        margin="dense"
        maxRows="4"
        disabled={isEditCommentDisabled}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <div className={styles.commentIconsWrapper}>
        {isEditCommentDisabled ? (
          <Tooltip title="Edit Comment" placement="top">
            <ModeEdit
              color="info"
              onClick={() => setIsEditCommentDisabled(false)}
            />
          </Tooltip>
        ) : (
          <>
            <Tooltip title="Save" placement="top">
              <PostAdd color="info" onClick={editCommentClickHandler} />
            </Tooltip>
            <Tooltip title="Cancel" placement="top">
              <Cancel color="info" onClick={cancelCommentHandler} />
            </Tooltip>
          </>
        )}

        <Tooltip title="Delete Comment" placement="top">
          <Delete color="error" onClick={deleteCommentClickHandler} />
        </Tooltip>
      </div>
    </div>
  )
}

export default InformationTaskComment
