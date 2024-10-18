import { createAction } from '@reduxjs/toolkit'

export type UserId = number

export interface User {
  name: string
}

export const updateUsername = createAction<{
  name: string
}>('user/updateUserName')
export const logout = createAction('user/logout')
