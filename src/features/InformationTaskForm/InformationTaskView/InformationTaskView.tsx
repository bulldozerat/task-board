import { useState } from 'react'
import { TextField, Tooltip } from '@mui/material'
import PostAddIcon from '@mui/icons-material/PostAdd'

import styles from './InformationTaskView.module.scss'
import { ICommentChangeData, ITaskColumnData } from 'types/Board.interfaces'
import InformationTaskCommentContainer from './InformationTaskComment/InformationTaskCommentContainer'

interface InformationTaskViewProps {
  activeTaskColumnData: ITaskColumnData
  addNewComment: (arg0: ICommentChangeData) => void
}

const InformationTaskView = (props: InformationTaskViewProps) => {
  const { activeTaskColumnData, addNewComment } = props
  const { id, title, description, comments, priority } =
    activeTaskColumnData.task

  const [newComment, setNewComment] = useState('')

  function createDataAndAddNewComment() {
    const addNewCommentData: ICommentChangeData = {
      taskId: id,
      taskColumn: activeTaskColumnData.column,
      newComment
    }

    addNewComment(addNewCommentData)
    setNewComment('')
  }

  const isDescriptionAvailable = description.length !== 0

  return (
    <div className={styles.informationTaskViewWrapper}>
      <div className={styles.informationTaskViewTitle}>{title}</div>
      <div
        className={`${styles.informationTaskViewSectionHeading} ${styles.informationTaskSection}`}>
        {priority} Priority
      </div>

      <div className={styles.informationTaskSection}>
        <div className={styles.informationTaskViewSectionHeading}>
          Desciption
        </div>
        <div className={styles.informationTaskViewDescription}>
          {isDescriptionAvailable ? description : 'Empty'}
        </div>
      </div>

      <div
        className={`${styles.informationTaskSection} ${styles.informationTaskViewAddComment}`}>
        <TextField
          value={newComment}
          label="Add New Comment"
          fullWidth
          multiline
          minRows="2"
          margin="dense"
          maxRows="4"
          onChange={(e) => setNewComment(e.target.value)}
        />
        {newComment.trim() !== '' && (
          <Tooltip title="Save Comment" placement="top">
            <PostAddIcon color="primary" onClick={createDataAndAddNewComment} />
          </Tooltip>
        )}
      </div>

      <div className={styles.informationTaskSection}>
        {comments.map((comment, index) => (
          <InformationTaskCommentContainer
            key={comment.id}
            comment={comment}
            activeTaskColumnData={activeTaskColumnData}
          />
        ))}
      </div>
    </div>
  )
}

export default InformationTaskView
