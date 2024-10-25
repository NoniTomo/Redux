import { useDispatch, useSelector, useStore } from 'react-redux'
import {
  asyncThunkCreator,
  buildCreateSlice,
  createAsyncThunk,
  type ThunkAction,
  type UnknownAction
} from '@reduxjs/toolkit'

import type { extraArgument, store } from '@/app/store'
import type { StateLists } from '@/entities/list/list.slice'
import type { StateTodo } from '@/entities/todo/todo.slice'
import type { StateUser } from '@/entities/user/user.slice'

export type State = {
  lists: StateLists
  todos: StateTodo
  user: StateUser
}

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument, UnknownAction>

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState
  dispatch: AppDispatch
  extra: typeof extraArgument
}>()

export type ExtraArgument = typeof extraArgument

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
})
