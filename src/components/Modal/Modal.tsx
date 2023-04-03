import { Modal as MaterialModal } from '@mui/material'
import styles from './Modal.module.scss'

interface ModalProps {
  isModalOpened: boolean
  closeModal: () => void
  title: string
  children: React.ReactNode
}

function Modal({ isModalOpened, closeModal, title, children }: ModalProps) {
  return (
    <MaterialModal
      open={isModalOpened}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <div className={styles.modalWrapper}>
        <div id="modal-modal-title" className={styles.modalTitle}>
          {title}
        </div>
        <div id="modal-modal-description">{children}</div>
      </div>
    </MaterialModal>
  )
}

export default Modal
