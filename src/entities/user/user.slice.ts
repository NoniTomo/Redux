import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { initialState } from '@/entities/initialState'

export type UserId = number

export interface User {
  name: string
}

export type StateUser = {
  user: User
  fetchUsersStatus: 'idle' | 'pending' | 'success' | 'failed'
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  selectors: {
    selectUserName: (state) => state.user?.name,
    selectIsFetchUsersPending: (state) => state.fetchUsersStatus === 'pending',
    selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === 'idle'
  },
  reducers: {
    updateUsername: (
      state,
      action: PayloadAction<{
        name: string
      }>
    ) => {
      if (!state.user?.name) {
        state.user.name = initialState.user.user?.name
      }

      state.user.name = action.payload.name
    },
    logout: (state) => {
      if (!state.user?.name) {
        state.user.name = initialState.user.user?.name
      }

      state.user.name = undefined!
    },
    fetchUserPending: (state) => {
      state.fetchUsersStatus = 'pending'
    },
    fetchUserFailed: (state) => {
      state.fetchUsersStatus = 'failed'
    },
    fetchUserSuccess: (state, action: PayloadAction<User>) => {
      state.fetchUsersStatus = 'success'
      state.user.name = action.payload.name
    }
  }
})
