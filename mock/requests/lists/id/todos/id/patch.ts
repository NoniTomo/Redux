import type { RestRequestConfig } from 'mock-config-server'

export const patchListsIdTodosIdConfig: RestRequestConfig = {
  path: '/lists/:listId/todos/:todoId',
  method: 'patch',
  routes: [
    {
      data: (request) => ({
        todo: request.body.todo
      }),
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
