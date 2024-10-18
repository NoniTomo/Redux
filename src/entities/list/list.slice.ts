import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { initialState } from '../initialState'

export type ListId = number

export interface List {
  id: ListId
  name: string
}

export interface StateLists {
  entities: Record<ListId, List>
  ids: ListId[]
}
export const listsSlice = createSlice({
  name: 'lists',
  initialState: initialState.lists,
  reducers: {
    createList: (state, action: PayloadAction<List>) => ({
      entities: { ...state.entities, [action.payload.id]: action.payload },
      ids: [action.payload.id, ...state.ids]
    }),
    deleteList: (
      state,
      action: PayloadAction<{
        listId: ListId
      }>
    ) => {
      const listId = action.payload.listId
      const entities = { ...state.entities }
      delete entities[listId]

      return {
        entities: entities,
        ids: state.ids.filter((id: ListId) => id !== listId)
      }
    },
    changeList: (
      state,
      action: PayloadAction<{
        listId: ListId
        name: string
      }>
    ) => {
      const { name, listId } = action.payload

      return {
        ...state,
        entities: {
          ...state.entities,
          [listId]: { ...state.entities[listId], name }
        }
      }
    },
    storedList: (
      _,
      action: PayloadAction<{
        entities: Record<ListId, List>
        ids: ListId[]
      }>
    ) => ({
      entities: action.payload.entities,
      ids: action.payload.ids
    })
  }
})
