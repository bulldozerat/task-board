import userEvent from '@testing-library/user-event'
import { act, screen, render } from '@testing-library/react'
import CreateTaskForm from './CreateTaskForm'

describe('<CreateTaskForm /> Component', () => {
  test('Fill form and submit', async () => {
    const user = userEvent.setup()
    const createTask = jest.fn()

    render(<CreateTaskForm createTask={createTask} />)

    const createNewTaskBtn = screen.getByRole('button', {
      name: /create new task/i
    })
    const taskTitleInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /task title/i
    })

    const priorityDropdown = screen.getByRole('button', { name: /none/i })
    const descriptionInput = screen.getByRole('textbox', {
      name: /task description/i
    })

    expect(createNewTaskBtn).toBeDisabled()

    const taskTitleText = 'Some Title to enable the button'
    const taskDescriptionText = 'Some description text'
    const selectNewValue = 'HIGH'

    // TODO try to remove the act
    await act(async () => {
      await user.type(taskTitleInput, taskTitleText)
      await user.click(priorityDropdown)
    })

    await act(async () => {
      await user.click(
        screen.getByRole('option', { name: RegExp(selectNewValue, 'i') })
      )
    })

    await act(async () => {
      await user.type(descriptionInput, taskDescriptionText)
    })

    expect(taskTitleInput).toHaveValue(taskTitleText)
    screen.getByRole('button', { name: RegExp(selectNewValue, 'i') })
    screen.getByText(taskDescriptionText)
    expect(createNewTaskBtn).toBeEnabled()

    await act(async () => await user.click(createNewTaskBtn))
    expect(createTask).toHaveBeenCalledTimes(1)
  })
})
