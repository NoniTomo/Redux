import type { RestRequestConfig } from 'mock-config-server'

export const postListsIdTodosConfig: RestRequestConfig = {
  path: '/lists/:listId/todos',
  method: 'post',
  routes: [
    {
      data: (request) => ({
        todo: {
          listId: Number(request.params.listId),
          name: request.body.name,
          id: Date.now(),
          value: false
        }
      }),
      entities: {
        body: {
          name: { checkMode: 'exists' }
        },
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
