import { useDispatch, useSelector, useStore } from 'react-redux'
import { Router } from 'react-router-dom'
import type { ThunkAction, UnknownAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

import { api } from '@/shared/api'

import type { StateLists } from './list/list.slice'
import { listsSlice } from './list/list.slice'
import type { StateTodo } from './todo/todo.slice'
import { todosSlice } from './todo/todo.slice'
import type { StateUser } from './user/user.slice'
import { userSlice } from './user/user.slice'

export type State = {
  lists: StateLists
  todos: StateTodo
  user: StateUser
}

const extraArgument = {
  api,
  Router
}

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [listsSlice.name]: listsSlice.reducer,
    [todosSlice.name]: todosSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } })
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument, UnknownAction>

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()
