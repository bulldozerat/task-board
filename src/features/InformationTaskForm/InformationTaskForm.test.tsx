import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { activeTaskColumnData } from 'utils/testsDummyData'
import { renderWithProviders } from 'utils/testUtils'
import InformationTaskForm from './InformationTaskForm'

describe('<InformationTaskForm /> Component', () => {
  test('Renders task information', () => {
    renderWithProviders(
      <InformationTaskForm
        activeTaskColumnData={activeTaskColumnData}
        deleteTask={jest.fn()}
        closeMainModal={jest.fn()}
      />
    )

    const { taskNumber, title, priority, description } =
      activeTaskColumnData.task

    screen.getByText(taskNumber)
    screen.getByText(title)
    screen.getByText(RegExp(priority, 'i'))
    screen.getByText(description)
    screen.getByRole('textbox', { name: /add new comment/i })
    screen.getByRole('button', { name: /edit/i })
    screen.getByRole('button', { name: /delete/i })
  })

  test('Enable and disable edit mode', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <InformationTaskForm
        activeTaskColumnData={activeTaskColumnData}
        deleteTask={jest.fn()}
        closeMainModal={jest.fn()}
      />
    )

    expect(
      screen.queryByRole('button', { name: /cancel edit/i })
    ).not.toBeInTheDocument()

    const editButton = screen.getByRole('button', { name: /edit/i })
    await act(async () => await user.click(editButton))

    const cancelButton = screen.getByRole('button', { name: /cancel edit/i })
    expect(cancelButton).toBeInTheDocument()

    await act(async () => await user.click(cancelButton))
    expect(
      screen.queryByRole('button', { name: /cancel edit/i })
    ).not.toBeInTheDocument()
  })
})
