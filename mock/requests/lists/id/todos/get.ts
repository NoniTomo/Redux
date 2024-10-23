import { DATABASE } from 'mock/database'
import type { RestRequestConfig } from 'mock-config-server'

export const getListsIdTodosConfig: RestRequestConfig = {
  path: '/lists/:listId/todos',
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
