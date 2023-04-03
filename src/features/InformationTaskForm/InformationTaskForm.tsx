import { useState } from 'react'
import { Button } from '@mui/material'

import styles from './InformationTaskForm.module.scss'
import { ITaskColumnData } from 'types/Board.interfaces'
import InformationTaskView from './InformationTaskView'
import InformationTaskEditContainer from './InformationTaskEdit/InformationTaskEditContainer'

interface InformationTaskFormProps {
  activeTaskColumnData: ITaskColumnData
  deleteTask: () => void
  closeMainModal: () => void
}

// TODO develop add comment and update it functionality
const InformationTaskForm = (props: InformationTaskFormProps) => {
  const { activeTaskColumnData, deleteTask, closeMainModal } = props
  const [isEditEnabled, setIsEditEnabled] = useState(false)

  const deleteTaskInformation = () => {
    deleteTask()
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
        <InformationTaskView activeTaskColumnData={activeTaskColumnData} />
      )}

      <div className={styles.informationFormButtonsWrapper}>
        <div>
          <Button variant="contained" onClick={toggleEditModal}>
            {isEditEnabled ? 'Cancel Edit' : 'Edit'}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={deleteTaskInformation}>
            Delete
          </Button>
        </div>
      </div>
    </form>
  )
}

export default InformationTaskForm
