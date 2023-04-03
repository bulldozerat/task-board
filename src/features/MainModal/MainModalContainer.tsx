import { useAppSelector, useAppDispatch } from 'hooks/reduxHooks'
import {
  selectMainModalData,
  closeMainModal
} from 'store/slices/mainModalSlice'

import MainModal from './MainModal'

function MainModalContainer() {
  const { isModalOpened, renderCreateTaskForm, renderViewTaskForm } =
    useAppSelector(selectMainModalData)
  const dispatch = useAppDispatch()

  return (
    <MainModal
      isModalOpened={isModalOpened}
      renderViewTaskForm={renderViewTaskForm}
      renderCreateTaskForm={renderCreateTaskForm}
      closeMainModal={() => dispatch(closeMainModal())}
    />
  )
}

export default MainModalContainer
