import type { RestRequestConfig } from 'mock-config-server'

export const deleteListsIdConfig: RestRequestConfig = {
  path: '/lists/:listId',
  method: 'delete',
  routes: [
    {
      data: {},
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
