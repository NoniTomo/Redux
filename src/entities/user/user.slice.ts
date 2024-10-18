import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { initialState } from '@/entities/initialState'

export type UserId = number

export interface User {
  name: string
}

export type StateUser = User

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    updateUsername: (
      state,
      action: PayloadAction<{
        name: string
      }>
    ) => {
      if (!state.name) {
        state.name = initialState.user.name
      }

      state.name = action.payload.name
    },
    logout: (state) => {
      if (!state.name) {
        state.name = initialState.user.name
      }

      state.name = undefined!
    }
  }
})
