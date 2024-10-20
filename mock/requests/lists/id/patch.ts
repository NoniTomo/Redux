import type { RestRequestConfig } from 'mock-config-server'

export const patchListsIdConfig: RestRequestConfig = {
  path: '/lists/:listId',
  method: 'patch',
  routes: [
    {
      data: (request) => request.body,
      entities: {
        params: {
          listId: {
            checkMode: 'regExp',
            value: [/^\d+$/]
          }
        },
        body: {
          name: { checkMode: 'exists' }
        }
      }
    }
  ]
}
