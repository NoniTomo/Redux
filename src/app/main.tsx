import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { store } from '@/entities/store.ts'
import { TodoList } from '@/features/todo/ui/TodoList'
import { MainPage } from '@/pages/MainPage.tsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: '/list/:id',
        element: <TodoList />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
