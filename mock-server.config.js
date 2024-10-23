import * as REQUESTS from './mock/requests'

const mockServerConfig = {
  baseUrl: '/api',
  rest: {
    configs: Object.values(REQUESTS)
  },
  staticPath: {
    path: '/mock/static/images',
    prefix: '/static'
  }
}

export default mockServerConfig
