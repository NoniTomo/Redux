import type { RestRequestConfig } from 'mock-config-server'

export const deleteListsIdTodosIdConfig: RestRequestConfig = {
  path: '/lists/:listId/todos/:todoId',
  method: 'delete',
  routes: [
    {
      data: null,
      entities: {
        params: {
          listId: {
            checkMode: 'regExp',
            value: [/^\d+$/]
          },
          todoId: {
            checkMode: 'regExp',
            value: [/^\d+$/]
          }
        }
      }
    }
  ]
}
