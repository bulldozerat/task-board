import { v4 as uuidv4 } from 'uuid'
import styles from './InformationTaskView.module.scss'
import { ITaskColumnData } from 'types/Board.interfaces'

interface InformationTaskViewProps {
  activeTaskColumnData: ITaskColumnData
}

const InformationTaskView = (props: InformationTaskViewProps) => {
  const {
    task: { title, description, comments, priority }
  } = props.activeTaskColumnData

  const isDescriptionAvailable = description.length !== 0
  const isAtLeastOneComment = comments.length !== 0

  return (
    <div className={styles.informationTaskViewWrapper}>
      <div className={styles.informationTaskViewTitle}>{title}</div>
      <div className={styles.informationTaskViewSectionHeading}>
        {priority} Priority
      </div>

      <div>
        <div className={styles.informationTaskViewSectionHeading}>
          Desciption
        </div>
        <div className={styles.informationTaskViewDescription}>
          {isDescriptionAvailable ? description : 'Empty'}
        </div>
      </div>

      <div>
        <div className={styles.informationTaskViewSectionHeading}>Comments</div>
        {isAtLeastOneComment
          ? comments.map((comment) => <div key={uuidv4()}>{comment}</div>)
          : 'No comments'}
      </div>
    </div>
  )
}

export default InformationTaskView
