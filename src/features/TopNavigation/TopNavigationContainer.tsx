import { useAppDispatch } from 'hooks/reduxHooks'
import { openMainModalWithCreateTaskForm } from 'store/slices/mainModalSlice'

import TopNavigation from './TopNavigation'

function TopNavigationContainer() {
  const dispatch = useAppDispatch()

  return (
    <TopNavigation
      openMainModalWithCreateTaskForm={() =>
        dispatch(openMainModalWithCreateTaskForm())
      }
    />
  )
}

export default TopNavigationContainer
