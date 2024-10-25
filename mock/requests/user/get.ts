import { DATABASE } from 'mock/database'
import type { RestRequestConfig } from 'mock-config-server'

export const getUserConfig: RestRequestConfig = {
  path: '/user',
  method: 'get',
  routes: [
    {
      data: DATABASE.USER
    }
  ]
}

export const getLogoutUserConfig: RestRequestConfig = {
  path: '/logout',
  method: 'get',
  routes: [
    {
      data: null
    }
  ]
}
