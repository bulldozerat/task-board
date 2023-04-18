import { screen, render, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InformationTaskComment from './InformationTaskComment'
import { activeTaskColumnData, commmentOne } from 'utils/testsDummyData'

describe('<InformationTaskComment /> Component', () => {
  test('Render comment', () => {
    render(
      <InformationTaskComment
        comment={commmentOne}
        activeTaskColumnData={activeTaskColumnData}
        deleteComment={jest.fn()}
        editComment={jest.fn()}
      />
    )

    expect(screen.getByDisplayValue(commmentOne.text)).toBeInTheDocument()
    screen.getByTestId('ModeEditIcon')
    screen.getByTestId('DeleteIcon')
  })

  test('Toggle edit mode and actions', async () => {
    const user = userEvent.setup()
    const deleteComment = jest.fn()
    const editComment = jest.fn()

    render(
      <InformationTaskComment
        comment={commmentOne}
        activeTaskColumnData={activeTaskColumnData}
        deleteComment={deleteComment}
        editComment={editComment}
      />
    )

    // delete action
    const deleteIcon = screen.getByTestId('DeleteIcon')
    await act(async () => await user.click(deleteIcon))
    expect(deleteComment).toHaveBeenCalledTimes(1)

    // enabled edit mode
    const editIcon = screen.getByTestId('ModeEditIcon')
    await act(async () => await user.click(editIcon))

    const cancelIcon = screen.getByTestId('CancelIcon')
    const addIcon = screen.getByTestId('PostAddIcon')
    expect(addIcon).toBeInTheDocument()
    expect(cancelIcon).toBeInTheDocument()
    expect(editIcon).not.toBeInTheDocument()

    // edit action
    await act(async () => await user.click(addIcon))
    expect(editComment).toHaveBeenCalledTimes(1)

    // cancel edit mode
    await act(async () => await user.click(cancelIcon))
    expect(addIcon).not.toBeInTheDocument()
    expect(cancelIcon).not.toBeInTheDocument()
    expect(screen.getByTestId('ModeEditIcon')).toBeInTheDocument()
  })
})
