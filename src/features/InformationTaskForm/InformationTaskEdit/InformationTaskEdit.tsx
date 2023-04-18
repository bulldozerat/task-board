import { useState } from 'react'
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material'

import styles from './InformationTaskEdit.module.scss'
import {
  IBoardTask,
  ITaskColumnData,
  TASK_PRIORITY
} from 'types/Board.interfaces'

interface InformationTaskEditProps {
  activeTaskColumnData: ITaskColumnData
  editTask: (argO: ITaskColumnData) => void
  closeMainModal: () => void
  toggleEditModal: () => void
}

const InformationTaskEdit = (props: InformationTaskEditProps) => {
  const {
    activeTaskColumnData: { task, column },
    editTask,
    closeMainModal,
    toggleEditModal
  } = props

  const { title, description, priority } = task
  const [taskTitleValue, setTaskTitleValue] = useState(title)
  const [taskDescriptionValue, setTaskDescriptionValue] = useState(description)
  const [taskPriority, setTaskPriority] = useState(priority)

  const isTheSameTaskData =
    title === taskTitleValue &&
    description === taskDescriptionValue &&
    priority === taskPriority

  const isTaskFormButtonDisabled =
    taskTitleValue.length < 2 || isTheSameTaskData

  const saveTaskChanges = () => {
    const newTaskData: IBoardTask = {
      ...task,
      title: taskTitleValue,
      description: taskDescriptionValue,
      priority: taskPriority
    }

    editTask({ task: newTaskData, column })
    closeMainModal()
    toggleEditModal()
  }

  return (
    <div className={styles.informationTaskEditWrapper}>
      <TextField
        value={taskTitleValue}
        type="text"
        label="Edit Title"
        fullWidth
        margin="dense"
        onChange={(e) => setTaskTitleValue(e.target.value)}
      />

      <FormControl variant="standard" fullWidth margin="dense">
        <Select
          value={taskPriority}
          variant="outlined"
          onChange={(event) =>
            setTaskPriority(event.target.value as TASK_PRIORITY)
          }>
          <MenuItem value="NONE">NONE</MenuItem>
          <MenuItem value="LOW">LOW</MenuItem>
          <MenuItem value="NORMAL">NORMAL</MenuItem>
          <MenuItem value="HIGH" selected>
            HIGH
          </MenuItem>
        </Select>
      </FormControl>

      <TextField
        value={taskDescriptionValue}
        label="Edit Description"
        fullWidth
        multiline
        minRows="4"
        margin="dense"
        maxRows="4"
        onChange={(e) => setTaskDescriptionValue(e.target.value)}
      />

      {isTheSameTaskData && (
        <div style={{ marginBottom: '5px', fontSize: '10px' }}>
          The current information is already saved
        </div>
      )}

      <Button
        variant="contained"
        size="small"
        disabled={isTaskFormButtonDisabled}
        onClick={saveTaskChanges}>
        Save Changes
      </Button>
    </div>
  )
}

export default InformationTaskEdit
