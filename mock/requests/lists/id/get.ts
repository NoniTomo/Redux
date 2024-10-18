import { DATABASE } from 'mock/database'
import type { RestRequestConfig } from 'mock-config-server'

export const getListsIdConfig: RestRequestConfig = {
  path: '/lists/:id',
  method: 'get',
  routes: [
    {
      data: DATABASE.TODOS
    }
  ]
}
