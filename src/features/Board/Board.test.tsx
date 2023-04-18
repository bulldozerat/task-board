import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/testUtils'
import { IBoardData } from 'types/Board.interfaces'
import { boardColumnData } from 'utils/testsDummyData'

import Board from './Board'

const boardData: IBoardData = {
  someKey: boardColumnData
}

const boardData2: IBoardData = {
  secondKey: boardColumnData
}

describe('<Board /> Component', () => {
  test('Renders board information', () => {
    renderWithProviders(<Board boardData={boardData} />)
    const { title, count, tasks } = boardData.someKey

    screen.getByText(RegExp(title, 'i'))
    screen.getByText(RegExp(String(count), 'i'))
    screen.getByText(tasks[0].title)
    screen.getByText(tasks[1].title)
  })

  test('Renders with different board data and keys', () => {
    renderWithProviders(<Board boardData={boardData2} />)
    const { title, count, tasks } = boardData2.secondKey

    screen.getByRole('heading', {
      name: RegExp(`${title} ${count}`, 'i')
    })
    screen.getByText(tasks[0].title)
    screen.getByText(tasks[1].title)
  })
})
