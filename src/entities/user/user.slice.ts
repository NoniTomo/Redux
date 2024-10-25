import type { PayloadAction } from '@reduxjs/toolkit'

import { createAppSlice } from '@/shared/lib/store'

import { getUserRequest } from './model/getUser'
import { logoutUserRequest } from './model/logoutUser'
import { patchUserRequest } from './model/patchUser'

export type UserId = number

export interface User {
  name: string
}

export type StateUser = {
  user: User | undefined
  fetchUserStatus: 'idle' | 'pending' | 'success' | 'failed'
  patchUserStatus: 'idle' | 'pending' | 'success' | 'failed'
  logoutStatus: 'idle' | 'pending' | 'success' | 'failed'
}

const initialState: StateUser = {
  user: undefined!,
  fetchUserStatus: 'idle',
  patchUserStatus: 'idle',
  logoutStatus: 'idle'
}

export const userSlice = createAppSlice({
  name: 'user',
  initialState: initialState,
  selectors: {
    selectUser: (state) => state.user,
    selectIsFetchUsersPending: (state) => state.fetchUserStatus === 'pending',
    selectIsFetchUsersIdle: (state) => state.fetchUserStatus === 'idle'
  },
  reducers: {},
  extraReducers: (create) => {
    create.addCase(getUserRequest.fulfilled, (state, action: PayloadAction<User>) => {
      state.fetchUserStatus = 'success'

      state.user = action.payload
    })
    create.addCase(patchUserRequest.fulfilled, (state, action: PayloadAction<User>) => {
      if (!state.user?.name) {
        state.user = initialState.user
      }

      state.patchUserStatus = 'success'
      state.user = action.payload
    })
    create.addCase(logoutUserRequest.fulfilled, (state) => {
      state.logoutStatus = 'success'
      state.user = undefined
    })
    create.addCase(getUserRequest.pending, (state) => {
      state.fetchUserStatus = 'pending'
    })
    create.addCase(patchUserRequest.pending, (state) => {
      state.patchUserStatus = 'pending'
    })
    create.addCase(logoutUserRequest.pending, (state) => {
      state.logoutStatus = 'pending'
    })
    create.addCase(getUserRequest.rejected, (state) => {
      state.fetchUserStatus = 'failed'
    })
    create.addCase(patchUserRequest.rejected, (state) => {
      state.patchUserStatus = 'failed'
    })
    create.addCase(logoutUserRequest.rejected, (state) => {
      state.logoutStatus = 'failed'
    })
  }
})
