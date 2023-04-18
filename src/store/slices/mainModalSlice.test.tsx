import mainModalReducer, {
  initialState,
  openMainModalWithCreateTaskForm,
  openMainModalWithViewTaskForm,
  closeMainModal
} from './mainModalSlice'

describe('mainModal reducer', () => {
  test('should handle initial state', () => {
    expect(mainModalReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    )
  })

  test('should handle openMainModalWithCreateTaskForm', () => {
    const actual = mainModalReducer(
      initialState,
      openMainModalWithCreateTaskForm()
    )

    expect(actual.isModalOpened).toEqual(true)
    expect(actual.renderCreateTaskForm).toEqual(true)
  })

  test('should handle openMainModalWiwthViewTaskForm', () => {
    const actual = mainModalReducer(
      initialState,
      openMainModalWithViewTaskForm()
    )

    expect(actual.isModalOpened).toEqual(true)
    expect(actual.renderViewTaskForm).toEqual(true)
  })

  test('should handle closeMainModal', () => {
    const actual = mainModalReducer(initialState, closeMainModal())

    expect(actual.isModalOpened).toEqual(false)
    expect(actual.renderCreateTaskForm).toEqual(false)
    expect(actual.renderViewTaskForm).toEqual(false)
  })
})
