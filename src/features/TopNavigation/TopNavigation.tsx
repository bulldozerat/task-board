import { Button } from '@mui/material'
import styles from './TopNavigation.module.scss'

interface TopNavigationProps {
  openMainModalWithCreateTaskForm: () => void
}

function TopNavigation(props: TopNavigationProps) {
  const { openMainModalWithCreateTaskForm } = props

  return (
    <div className={styles.topNavigation}>
      <Button
        variant="contained"
        size="small"
        onClick={openMainModalWithCreateTaskForm}>
        Create Task
      </Button>
    </div>
  )
}

export default TopNavigation
