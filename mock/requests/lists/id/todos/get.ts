import { DATABASE } from 'mock/database'
import type { RestRequestConfig } from 'mock-config-server'

import type { Todo } from '@/entities/todo/todo.slice'

export const getListsIdTodosConfig: RestRequestConfig = {
  path: '/lists/:listId/todos',
  method: 'get',
  routes: [
    {
      data: DATABASE.TODOS,
      entities: {
        params: {
          listId: {
            checkMode: 'regExp',
            value: [/^\d+$/]
          }
        }
      },
      interceptors: {
        response: (data: { items: Todo[] }, { request }) => {
          const { listId } = request.params
          return { items: data.items.filter((todo) => todo.listId === Number(listId)) }
        }
      }
    }
  ]
}
