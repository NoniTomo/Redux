import type { RestRequestConfig } from 'mock-config-server'

export const patchUserConfig: RestRequestConfig = {
  path: '/user',
  method: 'patch',
  routes: [
    {
      data: (request) => request.body,
      entities: {
        body: {
          name: { checkMode: 'exists' }
        }
      }
    }
  ]
}
