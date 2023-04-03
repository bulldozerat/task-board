import Modal from 'components/Modal'
import CreateTaskFormContainer from 'features/CreateTaskForm/CreateTaskFormContainer'
import InformationTaskFormContainer from 'features/InformationTaskForm/InformationTaskFormContainer'

interface MainModalProps {
  isModalOpened: boolean
  renderCreateTaskForm: boolean
  renderViewTaskForm: boolean
  closeMainModal: () => void
}

function MainModal(props: MainModalProps) {
  const {
    isModalOpened,
    renderCreateTaskForm,
    renderViewTaskForm,
    closeMainModal
  } = props

  return (
    <Modal
      title={renderCreateTaskForm ? 'Create Task' : 'Task Information'}
      isModalOpened={isModalOpened}
      closeModal={closeMainModal}>
      {renderCreateTaskForm && <CreateTaskFormContainer />}
      {renderViewTaskForm && <InformationTaskFormContainer />}
    </Modal>
  )
}

export default MainModal
