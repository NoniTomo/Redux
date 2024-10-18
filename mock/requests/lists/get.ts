import { DATABASE } from 'mock/database'
import type { RestRequestConfig } from 'mock-config-server'

export const getListsConfig: RestRequestConfig = {
  path: '/lists',
  method: 'get',
  routes: [
    {
      data: DATABASE.LISTS
    }
  ]
}
