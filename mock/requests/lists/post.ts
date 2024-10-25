import type { RestRequestConfig } from 'mock-config-server'

export const postListsConfig: RestRequestConfig = {
  path: '/lists',
  method: 'post',
  routes: [
    {
      data: (request) => ({
        id: Date.now(),
        name: request.body.name
      }),
      entities: {
        body: {
          name: { checkMode: 'exists' }
        }
      }
    }
  ]
}
