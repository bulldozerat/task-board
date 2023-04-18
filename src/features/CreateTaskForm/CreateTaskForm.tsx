import { useState } from 'react'
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material'

import style from './CreateTaskForm.module.scss'
import { INewTaskFormData, TASK_PRIORITY } from 'types/Board.interfaces'

interface CreateTaskFormProps {
  createTask: (arg0: INewTaskFormData) => void
}

const CreateTaskForm = ({ createTask }: CreateTaskFormProps) => {
  const [taskTitleValue, setTaskTitleValue] = useState('')
  const [taskDescriptionValue, setTaskDescriptionValue] = useState('')
  const [taskPriority, setTaskPriority] = useState<TASK_PRIORITY>('NONE')
  const isTaskFormButtonDisabled = taskTitleValue.length < 2

  const createNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTaskFromData: INewTaskFormData = {
      title: taskTitleValue,
      description: taskDescriptionValue,
      priority: taskPriority
    }

    createTask(newTaskFromData)
  }

  return (
    <form className={style.createTaskForm} onSubmit={createNewTask}>
      <TextField
        value={taskTitleValue}
        type="text"
        label="Task Title"
        fullWidth
        margin="dense"
        onChange={(e) => setTaskTitleValue(e.target.value)}
      />

      <FormControl variant="standard" fullWidth>
        <label className={style.createTaskFormLabel}>Priority</label>
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
        label="Task Description"
        fullWidth
        multiline
        minRows="4"
        margin="dense"
        onChange={(e) => setTaskDescriptionValue(e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        size="small"
        disabled={isTaskFormButtonDisabled}>
        Create New Task
      </Button>
    </form>
  )
}

export default CreateTaskForm
