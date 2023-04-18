import { useState } from 'react'
import { Button } from '@mui/material'

import styles from './InformationTaskForm.module.scss'
import { ITaskColumnData } from 'types/Board.interfaces'
import InformationTaskViewContainer from './InformationTaskView/informationTaskViewContainer'
import InformationTaskEditContainer from './InformationTaskEdit/InformationTaskEditContainer'

interface InformationTaskFormProps {
  activeTaskColumnData: ITaskColumnData
  deleteTask: (arg0: ITaskColumnData) => void
  closeMainModal: () => void
}

// TODO develop add comment and update it functionality
const InformationTaskForm = (props: InformationTaskFormProps) => {
  const { activeTaskColumnData, deleteTask, closeMainModal } = props
  const [isEditEnabled, setIsEditEnabled] = useState(false)

  const deleteTaskInformation = () => {
    deleteTask(activeTaskColumnData)
    closeMainModal()
  }

  const toggleEditModal = () => {
    setIsEditEnabled((prev) => !prev)
  }

  return (
    <form>
      <div className={styles.informationFormTaskNumner}>
        {activeTaskColumnData.task.taskNumber}
      </div>

      {isEditEnabled ? (
        <InformationTaskEditContainer
          activeTaskColumnData={activeTaskColumnData}
          toggleEditModal={toggleEditModal}
        />
      ) : (
        <InformationTaskViewContainer
          activeTaskColumnData={activeTaskColumnData}
        />
      )}

      <div className={styles.informationFormButtonsWrapper}>
        <Button variant="contained" size="small" onClick={toggleEditModal}>
          {isEditEnabled ? 'Cancel Edit' : 'Edit'}
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={deleteTaskInformation}>
          Delete
        </Button>
      </div>
    </form>
  )
}

export default InformationTaskForm
