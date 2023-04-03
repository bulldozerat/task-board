import { useAppDispatch } from 'hooks/reduxHooks'

import { editTask } from 'store/slices/boardSlice'
import { closeMainModal } from 'store/slices/mainModalSlice'

import { ITaskColumnData } from 'types/Board.interfaces'
import InformationTaskEdit from './InformationTaskEdit'

interface InformationTaskEditPropsContainer {
  activeTaskColumnData: ITaskColumnData
  toggleEditModal: () => void
}

const InformationTaskEditContainer = (
  props: InformationTaskEditPropsContainer
) => {
  const dispatch = useAppDispatch()

  return (
    <InformationTaskEdit
      {...props}
      editTask={(taskColumnData) => dispatch(editTask(taskColumnData))}
      closeMainModal={() => dispatch(closeMainModal())}
    />
  )
}

export default InformationTaskEditContainer
