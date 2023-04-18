import { screen, render, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { taskOne } from 'utils/testsDummyData'
import BoardTask from './BoardTask'

describe('<BoardTask /> Component', () => {
  test('Renders task information', async () => {
    const user = userEvent.setup()
    const setActiveTaskColumnData = jest.fn()
    const openMainModalWithViewTaskForm = jest.fn()

    render(
      <BoardTask
        task={taskOne}
        column="todo"
        openMainModalWithViewTaskForm={openMainModalWithViewTaskForm}
        setActiveTaskColumnData={setActiveTaskColumnData}
        setDraggedTaskColumnData={jest.fn()}
      />
    )

    screen.getByText(taskOne.title)
    screen.getByText(taskOne.taskNumber)
    screen.getByText(taskOne.priority)

    await act(async () => await user.click(screen.getByText(taskOne.title)))

    expect(setActiveTaskColumnData).toHaveBeenCalledTimes(1)
    expect(openMainModalWithViewTaskForm).toHaveBeenCalledTimes(1)
  })
})
