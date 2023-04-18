import userEvent from '@testing-library/user-event'
import { act, screen, render } from '@testing-library/react'
import { taskOne } from 'utils/testsDummyData'
import InformationTaskEdit from './InformationTaskEdit'

const activeTaskColumnData = {
  task: taskOne,
  column: 'todo'
}

describe('<InformationTaskEdit /> Component', () => {
  test('Fills edit form with provided task information', () => {
    render(
      <InformationTaskEdit
        activeTaskColumnData={activeTaskColumnData}
        editTask={jest.fn()}
        closeMainModal={jest.fn()}
        toggleEditModal={jest.fn()}
      />
    )

    const { title, priority, description } = activeTaskColumnData.task

    const editTitleInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /edit title/i
    })

    const editDescription: HTMLInputElement = screen.getByRole('textbox', {
      name: /edit description/i
    })

    expect(editTitleInput).toHaveValue(title)
    expect(editDescription).toHaveValue(description)
    screen.getByDisplayValue(new RegExp(priority, 'i'))
  })

  test('Save Changes is disabled if task data is the same', async () => {
    const user = userEvent.setup()

    render(
      <InformationTaskEdit
        activeTaskColumnData={activeTaskColumnData}
        editTask={jest.fn()}
        closeMainModal={jest.fn()}
        toggleEditModal={jest.fn()}
      />
    )

    const { description } = activeTaskColumnData.task
    const saveChangesButton = screen.getByRole('button', {
      name: /save changes/i
    })

    const editDescription: HTMLInputElement = screen.getByRole('textbox', {
      name: /edit description/i
    })

    expect(saveChangesButton).toBeDisabled()

    await act(async () => await user.type(editDescription, 'New description'))
    expect(saveChangesButton).toBeEnabled()

    // fill the same description like the inital render
    await act(async () => {
      await user.clear(editDescription)
      await user.type(editDescription, description)
    })
    expect(saveChangesButton).toBeDisabled()
  })

  test('Save Change button invokes the right funtions', async () => {
    const user = userEvent.setup()
    const editTask = jest.fn()
    const closeMainModal = jest.fn()
    const toggleEditModal = jest.fn()

    render(
      <InformationTaskEdit
        activeTaskColumnData={activeTaskColumnData}
        editTask={editTask}
        closeMainModal={closeMainModal}
        toggleEditModal={toggleEditModal}
      />
    )

    const saveChangesButton = screen.getByRole('button', {
      name: /save changes/i
    })

    const editDescription: HTMLInputElement = screen.getByRole('textbox', {
      name: /edit description/i
    })

    await act(async () => await user.type(editDescription, 'New description'))
    await act(async () => await user.click(saveChangesButton))

    expect(editTask).toHaveBeenCalledTimes(1)
    expect(closeMainModal).toHaveBeenCalledTimes(1)
    expect(toggleEditModal).toHaveBeenCalledTimes(1)
  })
})
