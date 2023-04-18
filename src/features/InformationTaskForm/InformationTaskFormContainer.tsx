import { useAppSelector, useAppDispatch } from 'hooks/reduxHooks'
import { selectActiveTaskColumnData, deleteTask } from 'store/slices/boardSlice'
import { closeMainModal } from 'store/slices/mainModalSlice'

import InformationTaskForm from './InformationTaskForm'

const InformationTaskFormContainer = () => {
  const activeTaskColumnData = useAppSelector(selectActiveTaskColumnData)
  const dispatch = useAppDispatch()

  return (
    <InformationTaskForm
      activeTaskColumnData={activeTaskColumnData}
      deleteTask={(activeTaskColumnData) =>
        dispatch(deleteTask(activeTaskColumnData))
      }
      closeMainModal={() => dispatch(closeMainModal())}
    />
  )
}

export default InformationTaskFormContainer
