import { useAppDispatch } from 'hooks/reduxHooks'
import { createTask } from 'store/slices/boardSlice'
import { closeMainModal } from 'store/slices/mainModalSlice'

import { INewTaskFormData } from 'types/Board.interfaces'
import CreateTaskForm from './CreateTaskForm'

function CreateTaskFormContainer() {
  const dispatch = useAppDispatch()

  const handleCreateTask = (newTaskFormData: INewTaskFormData) => {
    dispatch(createTask(newTaskFormData))
    dispatch(closeMainModal())
  }

  return <CreateTaskForm createTask={handleCreateTask} />
}

export default CreateTaskFormContainer
