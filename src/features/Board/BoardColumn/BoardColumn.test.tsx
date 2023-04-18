import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/testUtils'
import { taskOne, taskTwo, boardColumnData } from 'utils/testsDummyData'
import BoardColumn from './BoardColumn'

describe('<BoardColumn /> Component', () => {
  test('Renders column and different tasks information', () => {
    renderWithProviders(
      <BoardColumn boardColumnData={boardColumnData} moveTask={jest.fn()} />
    )

    screen.getByText(taskOne.title)
    screen.getByText(taskOne.taskNumber)
    screen.getByText(taskOne.priority)
    screen.getByText(taskTwo.title)
    screen.getByText(taskTwo.taskNumber)
    screen.getByText(taskTwo.priority)

    screen.getByRole('heading', {
      name: RegExp(`${boardColumnData.title} ${boardColumnData.count}`, 'i')
    })
  })
})
