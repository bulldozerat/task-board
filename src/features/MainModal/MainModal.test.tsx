import { screen, render } from '@testing-library/react'
import { renderWithProviders } from 'utils/testUtils'
import MainModal from './MainModal'
import { taskOne } from 'utils/testsDummyData'

const storeState = {
  board: {
    draggedTaskColumnData: undefined,
    activeTaskColumnData: {
      task: taskOne,
      column: 'blocked'
    },
    boardData: {
      blocked: {
        column: 'blocked',
        title: 'Blocked',
        count: 1,
        tasks: [taskOne]
      }
    }
  }
}

describe('<MainModal /> Component', () => {
  test('Renders opened MainModal with InformationTaskFormContainer', () => {
    renderWithProviders(
      <MainModal
        isModalOpened={true}
        renderCreateTaskForm={false}
        renderViewTaskForm={true}
        closeMainModal={jest.fn()}
      />,
      { preloadedState: storeState }
    )

    screen.getByText('Task Information')
    screen.getByText(/task information/i)
    screen.getByRole('button', { name: /edit/i })
    screen.getByRole('button', { name: /delete/i })
  })

  test('Renders opened MainModal with CreateTaskFormContainer', () => {
    renderWithProviders(
      <MainModal
        isModalOpened={true}
        renderCreateTaskForm={true}
        renderViewTaskForm={false}
        closeMainModal={jest.fn()}
      />,
      { preloadedState: storeState }
    )

    screen.getByText(/create task/i)
    screen.getByRole('textbox', { name: /task title/i })
    screen.getByText(/priority/i)
    screen.getByRole('textbox', { name: /task description/i })
  })

  test('Renders closed MainModal', () => {
    render(
      <MainModal
        isModalOpened={false}
        renderCreateTaskForm={false}
        renderViewTaskForm={false}
        closeMainModal={jest.fn()}
      />
    )

    expect(screen.queryByText('Task Information')).not.toBeInTheDocument()
  })
})
