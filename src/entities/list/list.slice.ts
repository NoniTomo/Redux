import type { PayloadAction } from '@reduxjs/toolkit'

import type {
  DeleteListIdRequestConfig,
  GetListsRequestConfig,
  PatchListIdRequestConfig,
  PostListsRequestConfig
} from '@/shared/api/requests'
import type { AppState, ExtraArgument } from '@/shared/lib/store'
import { createAppSlice } from '@/shared/lib/store'

export type ListId = number

export interface List {
  id: ListId
  name: string
}

export interface StateLists {
  entities: Record<ListId, List>
  ids: ListId[]
  fetchListsStatus: 'idle' | 'pending' | 'success' | 'failed'
  postListsStatus: 'idle' | 'pending' | 'success' | 'failed'
  deleteListsStatus: 'idle' | 'pending' | 'success' | 'failed'
  patchListsStatus: 'idle' | 'pending' | 'success' | 'failed'
}

const initialState: StateLists = {
  entities: {},
  ids: [],
  fetchListsStatus: 'idle',
  postListsStatus: 'idle',
  deleteListsStatus: 'idle',
  patchListsStatus: 'idle'
}

export const listsSlice = createAppSlice({
  name: 'lists',
  initialState: initialState,
  selectors: {
    selectIsFetchListsPending: (state) => state.fetchListsStatus === 'pending',
    selectIsFetchListsIdle: (state) => state.fetchListsStatus === 'idle',
    selectIsListsIds: (state) => state.ids
  },
  reducers: (creator) => ({
    getLists: creator.asyncThunk<
      {
        entities: Record<ListId, List>
        ids: ListId[]
      },
      GetListsRequestConfig & { refetch?: boolean },
      { extra: ExtraArgument }
    >(
      async (params: GetListsRequestConfig, thunkApi) =>
        await thunkApi.extra.api.getLists(params).then((res) => ({
          entities: res.data.items.reduce(
            (entities, list) => {
              entities[list.id] = list
              return entities
            },
            {} as Record<ListId, List>
          ),
          ids: res.data.items.map((list) => list.id)
        })),
      {
        options: {
          condition: (arg, { getState }) => {
            const isIdle = listsSlice.selectors.selectIsFetchListsIdle(getState() as AppState)

            if (!isIdle && !arg.refetch) return false

            return true
          }
        },
        pending: (state) => {
          state.fetchListsStatus = 'pending'
        },
        rejected: (state) => {
          state.fetchListsStatus = 'failed'
        },
        fulfilled: (
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
      }
    ),
    createList: creator.asyncThunk<List, PostListsRequestConfig, { extra: ExtraArgument }>(
      async ({ params, config }: PostListsRequestConfig, thunkApi) =>
        (await thunkApi.extra.api.postLists({ params, config })).data.list,
      {
        fulfilled: (state, action: PayloadAction<List>) => ({
          ...state,
          postListsStatus: 'success',
          entities: { ...state.entities, [action.payload.id]: action.payload },
          ids: [action.payload.id, ...state.ids]
        }),
        rejected: (state) => {
          state.postListsStatus = 'failed'
        },
        pending: (state) => {
          state.postListsStatus = 'pending'
        }
      }
    ),
    deleteList: creator.asyncThunk<
      { listId: ListId },
      DeleteListIdRequestConfig,
      { extra: ExtraArgument }
    >(
      async ({ params, config }: DeleteListIdRequestConfig, thunkApi) => {
        await thunkApi.extra.api.deleteListId({ params, config })

        thunkApi.extra.router.navigate('/')

        return { listId: params.listId }
      },
      {
        fulfilled: (
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
            deleteListsStatus: 'success',
            entities: entities,
            ids: state.ids.filter((id: ListId) => id !== listId)
          }
        },
        rejected: (state) => {
          state.deleteListsStatus = 'failed'
        },
        pending: (state) => {
          state.deleteListsStatus = 'pending'
        }
      }
    ),
    changeLists: creator.asyncThunk<
      {
        listId: ListId
        name: string
      },
      PatchListIdRequestConfig,
      { extra: ExtraArgument }
    >(
      async (params: PatchListIdRequestConfig, thunkApi) => {
        await thunkApi.extra.api.patchListId(params)
        return params.params
      },
      {
        fulfilled: (state, action) => {
          const { name, listId } = action.payload

          return {
            ...state,
            entities: {
              ...state.entities,
              [listId]: { ...state.entities[listId], name }
            }
          }
        },
        rejected: (state) => {
          state.patchListsStatus = 'failed'
        },
        pending: (state) => {
          state.patchListsStatus = 'pending'
        }
      }
    )
  })
})
