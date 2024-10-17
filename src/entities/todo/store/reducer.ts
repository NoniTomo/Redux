import { initialState } from '@/entities/initialState'
import type { ListId } from '@/entities/list/store/actions'
import type { Action } from '@/entities/store'

import type { Todo, TodoId } from './actions'

export interface StateTodo {
  entities: Record<TodoId, Todo>
  idsByList: Record<ListId, TodoId[]>
}

/* const initialState: StateTodo = {
  entities: {},
  idsByList: {}
} */

export const reducerTodo = (state: StateTodo = initialState.todos, action: Action) => {
  switch (action.type) {
    case 'createTodo': {
      return {
        entities: { ...state.entities, [action.payload.todo.id]: action.payload.todo },
        idsByList: {
          ...state.idsByList,
          [action.payload.listId]: [action.payload.todo.id, ...state.idsByList[action.payload.listId]]
        }
      }
    }
    case 'deleteTodo': {
      const { todoId, listId } = action.payload
      const entities = { ...state.entities }
      delete entities[todoId]

      return {
        entities: entities,
        idsByList: {
          ...state.idsByList,
          [listId]: state.idsByList[listId].filter((id) => id !== todoId)
        }
      }
    }
    case 'changeTodo': {
      const { todoId, todo } = action.payload
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: { ...state.entities[todoId], ...todo }
        }
      }
    }
    case 'storedTodo': {
      return {
        entities: action.payload.entities,
        idsByList: action.payload.idsByList
      }
    }
    default: {
      return state
    }
  }
}
