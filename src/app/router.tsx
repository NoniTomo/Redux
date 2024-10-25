import { createBrowserRouter } from 'react-router-dom'

import { store } from '@/app//store'
import { listsSlice } from '@/entities/list/list.slice'
import { getTodosRequest } from '@/entities/todo/model/getTodos'
import { todosSlice } from '@/entities/todo/todo.slice'
import { getUserRequest } from '@/entities/user/model/getUser'
import { TodoList } from '@/features/todo/ui/TodoList'
import { MainPage } from '@/pages/MainPage.tsx'

const loadStore = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(store), 0)
  })

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    loader: () => {
      loadStore().then(() => {
        store.dispatch(getUserRequest({ refetch: false }))
        store.dispatch(listsSlice.actions.getLists({}))
      })

      return null
    },
    children: [
      {
        path: '/list/:listId',
        element: <TodoList />,
        loader: ({ params }) => {
          loadStore().then(() => {
            const refetch = !todosSlice.selectors.selectIdsByListIncludeListId(
              store.getState(),
              params.listId
            )

            store.dispatch(
              getTodosRequest({
                params: { listId: Number(params.listId) },
                refetch
              })
            )
          })
          return null
        }
      }
    ]
  }
])
