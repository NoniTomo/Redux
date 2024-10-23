import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { store } from '@/app/store'
import { getListsRequest } from '@/entities/list/model/getLists'

import { router } from './router'

import './index.css'

store.dispatch(getListsRequest)

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
