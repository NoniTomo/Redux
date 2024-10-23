import { configureStore } from '@reduxjs/toolkit'

import { listsSlice } from '@/entities/list/list.slice'
import { todosSlice } from '@/entities/todo/todo.slice'
import { userSlice } from '@/entities/user/user.slice'
import { api } from '@/shared/api'

import { router } from './router'

export const extraArgument = {
  api,
  router
}

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [listsSlice.name]: listsSlice.reducer,
    [todosSlice.name]: todosSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } })
})
