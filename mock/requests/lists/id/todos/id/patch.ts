import type { RestRequestConfig } from 'mock-config-server'

export const patchListsIdTodosIdConfig: RestRequestConfig = {
  path: '/lists/:listId/todos',
  method: 'patch',
  routes: [
    {
      data: (request) => request.body,
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
