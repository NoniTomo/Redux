import { DATABASE } from 'mock/database'
import type { RestRequestConfig } from 'mock-config-server'

export const getListsIdTodosConfig: RestRequestConfig = {
  path: '/lists/:id/todos',
  method: 'get',
  routes: [
    {
      data: DATABASE.TODOS,
      entities: {
        params: {
          listId: {
            checkMode: 'regExp',
            value: [/^\d+$/]
          }
        }
      }
    }
  ]
}
