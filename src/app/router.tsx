import { createBrowserRouter } from 'react-router-dom'

import { store } from '@/app//store'
import { getListsRequest } from '@/entities/list/model/getLists'
import { getTodosRequest } from '@/entities/todo/model/getTodos'
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
        store.dispatch(getListsRequest({}))
      })

      return null
    },
    children: [
      {
        path: '/list/:listId',
        element: <TodoList />,
        loader: ({ params }) => {
          loadStore().then(() => {
            store.dispatch(getTodosRequest({ params: { listId: Number(params.listId) }, refetch: true }))
          })
          return null
        }
      }
    ]
  }
])
