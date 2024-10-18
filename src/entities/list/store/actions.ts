import { createAction } from '@reduxjs/toolkit'

export type ListId = number

export interface List {
  id: ListId
  name: string
}

export const createListAction = createAction<List>('lists/createList')
export const deleteListAction = createAction<{
  listId: ListId
}>('lists/deleteList')
export const changeListAction = createAction<{
  listId: ListId
  name: string
}>('lists/changeList')
export const storedListAction = createAction<{
  entities: Record<ListId, List>
  ids: ListId[]
}>('lists/storedList')
