import type { RestRequestConfig } from 'mock-config-server'

export const patchUserConfig: RestRequestConfig = {
  path: '/user',
  method: 'patch',
  routes: [
    {
      data: [],
      entities: {
        body: {
          'user.name': { checkMode: 'exists' }
        }
      },
      interceptors: {
        request: (request) => {
          return request.request.body
        }
      }
    }
  ]
}
