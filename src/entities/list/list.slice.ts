import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@/shared/lib/store'

import { getListsRequest } from './model/getLists'

export type ListId = number

export interface List {
  id: ListId
  name: string
}

const initialState: StateLists = {
  entities: {},
  ids: [],
  fetchListsStatus: 'idle'
}

export interface StateLists {
  entities: Record<ListId, List>
  ids: ListId[]
  fetchListsStatus: 'idle' | 'pending' | 'success' | 'failed'
}

export const listsSlice = createSlice({
  name: 'lists',
  initialState: initialState,
  selectors: {
    selectIsFetchListsPending: (state) => state.fetchListsStatus === 'pending',
    selectIsFetchListsIdle: (state) => state.fetchListsStatus === 'idle',
    selectIsListsIds: (state) => state.ids
  },
  reducers: {
    createList: (state, action: PayloadAction<List>) => ({
      ...state,
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
        ...state,
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getListsRequest.pending, (state) => {
      state.fetchListsStatus = 'pending'
    })
    builder.addCase(getListsRequest.rejected, (state) => {
      state.fetchListsStatus = 'failed'
    })
    builder.addCase(
      getListsRequest.fulfilled,
      (
        state,
        action: PayloadAction<{
          entities: Record<ListId, List>
          ids: ListId[]
        }>
      ) => ({
        ...state,
        fetchListsStatus: 'success',
        entities: action.payload.entities,
        ids: action.payload.ids
      })
    )
  }
})
