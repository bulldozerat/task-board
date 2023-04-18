import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

export interface IMainModalState {
  isModalOpened: boolean
  renderCreateTaskForm: boolean
  renderViewTaskForm: boolean
}

export const initialState: IMainModalState = {
  isModalOpened: false,
  renderCreateTaskForm: false,
  renderViewTaskForm: false
}

const mainModalSlice = createSlice({
  name: 'mainModal',
  initialState,
  reducers: {
    openMainModalWithCreateTaskForm(state) {
      state.isModalOpened = true
      state.renderCreateTaskForm = true
    },
    openMainModalWithViewTaskForm(state) {
      state.isModalOpened = true
      state.renderViewTaskForm = true
    },
    closeMainModal(state) {
      state.isModalOpened = false
      state.renderCreateTaskForm = false
      state.renderViewTaskForm = false
    }
  }
})

export const {
  openMainModalWithCreateTaskForm, openMainModalWithViewTaskForm, closeMainModal
} = mainModalSlice.actions

export const selectMainModalData = (state: RootState) =>
  state.mainModal

export default mainModalSlice.reducer
