import { screen, render } from '@testing-library/react'
import Modal from './Modal'

describe('<Modal /> Component', () => {
  test('Renders modal information', () => {
    const modalTitle = 'Modal Title'
    const htmlText = 'Some HTML text'

    render(
      <Modal isModalOpened={true} closeModal={jest.fn()} title={modalTitle}>
        <div>{htmlText}</div>
      </Modal>
    )

    screen.getByText(modalTitle)
    screen.getByText(htmlText)
  })
})
