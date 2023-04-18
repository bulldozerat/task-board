import { screen, render, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TopNavigation from './TopNavigation'

describe('<TopNavigation /> Component', () => {
  test('Renders TopNavigation', async () => {
    const user = userEvent.setup()
    const openMainModalWithCreateTaskForm = jest.fn()

    render(
      <TopNavigation
        openMainModalWithCreateTaskForm={openMainModalWithCreateTaskForm}
      />
    )

    const createTaskButton = screen.getByRole('button', {
      name: /create task/i
    })

    await act(async () => {
      await user.click(createTaskButton)
    })

    expect(openMainModalWithCreateTaskForm).toHaveBeenCalledTimes(1)
  })
})
