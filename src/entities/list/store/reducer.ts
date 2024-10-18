import { createReducer } from '@reduxjs/toolkit'

import { initialState } from '@/entities/initialState'

import {
  changeListAction,
  createListAction,
  deleteListAction,
  type List,
  type ListId,
  storedListAction
} from './actions'

export interface StateLists {
  entities: Record<ListId, List>
  ids: ListId[]
}

export const reducerList = createReducer(initialState.lists, (builder) => {
  builder.addCase(createListAction, (state, action) => ({
    entities: { ...state.entities, [action.payload.id]: action.payload },
    ids: [action.payload.id, ...state.ids]
  }))
  builder.addCase(deleteListAction, (state, action) => {
    const listId = action.payload.listId
    const entities = { ...state.entities }
    delete entities[listId]

    return {
      entities: entities,
      ids: state.ids.filter((id) => id !== listId)
    }
  })
  builder.addCase(changeListAction, (state, action) => {
    const { name, listId } = action.payload

    return {
      ...state,
      entities: { ...state.entities, [listId]: { ...state.entities[listId], name } }
    }
  })
  builder.addCase(storedListAction, (state, action) => ({
    entities: action.payload.entities,
    ids: action.payload.ids
  }))
})
