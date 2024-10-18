import { useDispatch, useSelector, useStore } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { reducerList } from '@/entities/list/store/reducer'
import { reducerTodo } from '@/entities/todo/store/reducer'
import { reducerUser } from '@/entities/user/reducer'

import type { StateLists } from './list/store/reducer'
import type { StateTodo } from './todo/store/reducer'
import type { StateUser } from './user/reducer'

export type State = {
  lists: StateLists
  todos: StateTodo
  user: StateUser
}

export const reducer = combineReducers({
  lists: reducerList,
  todos: reducerTodo,
  user: reducerUser
})

export const store = configureStore({
  reducer: reducer
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()
