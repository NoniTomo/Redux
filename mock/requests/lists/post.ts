import type { RestRequestConfig } from 'mock-config-server'

export const postListsConfig: RestRequestConfig = {
  path: '/lists',
  method: 'post',
  routes: [
    {
      data: () => ({ id: Date.now() }),
      entities: {
        body: {
          name: { checkMode: 'exists' }
        }
      }
    }
  ]
}
