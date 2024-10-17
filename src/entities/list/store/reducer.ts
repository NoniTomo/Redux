import { initialState } from '@/entities/initialState'
import type { Action } from '@/entities/store'

import type { List, ListId } from './actions'

export interface StateLists {
  entities: Record<ListId, List>
  ids: ListId[]
}

export const reducerList = (state: StateLists = initialState.lists, action: Action) => {
  switch (action.type) {
    case 'createList': {
      return {
        entities: { ...state.entities, [action.payload.id]: action.payload },
        ids: [action.payload.id, ...state.ids]
      }
    }
    case 'deleteList': {
      const listId = action.payload.listId
      const entities = { ...state.entities }
      delete entities[listId]

      return {
        entities: entities,
        ids: state.ids.filter((id) => id !== listId)
      }
    }
    case 'changeList': {
      const { name, listId } = action.payload

      return {
        ...state,
        entities: { ...state.entities, [listId]: { ...state.entities[listId], name } }
      }
    }
    case 'storedList': {
      return {
        entities: action.payload.entities,
        ids: action.payload.ids
      }
    }
    default: {
      return state
    }
  }
}
