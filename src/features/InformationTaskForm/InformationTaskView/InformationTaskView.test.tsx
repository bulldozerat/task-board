import { screen, render, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { activeTaskColumnData } from 'utils/testsDummyData'
import InformationTaskView from './InformationTaskView'

describe('<InformationTaskView /> Component', () => {
  test('Renders InformationTaskView information and adds a comment', async () => {
    const user = userEvent.setup()
    const addNewComment = jest.fn()

    render(
      <InformationTaskView
        activeTaskColumnData={activeTaskColumnData}
        addNewComment={addNewComment}
      />
    )

    const { title, priority, description } = activeTaskColumnData.task

    screen.getByText(title)
    screen.getByText(RegExp(priority, 'i'))
    screen.getByText(description)

    const commentText = 'Some comment text'
    const addNewCommentInput = screen.getByRole('textbox', {
      name: /add new comment/i
    })

    await act(async () => await user.type(addNewCommentInput, commentText))

    const addIcon = screen.getByTestId('PostAddIcon')
    expect(addIcon).toBeInTheDocument()

    await act(async () => await user.click(addIcon))
    expect(addNewComment).toHaveBeenCalledTimes(1)

    await act(async () => await user.clear(addNewCommentInput))
    expect(addIcon).not.toBeInTheDocument()
  })
})
