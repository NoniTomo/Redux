import { createReducer } from '@reduxjs/toolkit'

import { initialState } from '@/entities/initialState'

import { logout, updateUsername, type User } from './actions'

export type StateUser = User

export const reducerUser = createReducer(initialState.user, (builder) => {
  builder.addCase(updateUsername, (state, action) => {
    if (!state.name) {
      state.name = initialState.user.name
    }

    state.name = action.payload.name
  })
  builder.addCase(logout, (state) => {
    if (!state.name) {
      state.name = initialState.user.name
    }

    state.name = undefined!
  })
})
