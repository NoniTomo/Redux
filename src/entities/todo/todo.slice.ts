import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'

import { createAppSlice } from '@/shared/lib/store'

import { type List, type ListId, listsSlice } from '../list/list.slice'

import { deleteTodosRequest } from './model/deleteTodos'
import { getTodosRequest } from './model/getTodos'
import { patchTodosRequest } from './model/patchTodos'
import { postTodosRequest } from './model/postTodos'

export type TodoId = number

export interface Todo {
  listId: ListId
  id: TodoId
  name: string
  value: boolean
}

export interface StateTodo {
  entities: Record<TodoId, Todo | undefined>
  idsByList: Record<ListId, TodoId[]>
  fetchTodosStatus: 'idle' | 'pending' | 'success' | 'failed'
  deleteTodoStatus: 'idle' | 'pending' | 'success' | 'failed'
  postTodosStatus: 'idle' | 'pending' | 'success' | 'failed'
  patchTodosStatus: 'idle' | 'pending' | 'success' | 'failed'
}

const initialState: StateTodo = {
  entities: {},
  idsByList: {},
  fetchTodosStatus: 'idle',
  deleteTodoStatus: 'idle',
  postTodosStatus: 'idle',
  patchTodosStatus: 'idle'
}

export const todosSlice = createAppSlice({
  name: 'todos',
  initialState: initialState,
  selectors: {
    selectTodosByListId: createSelector(
      (state: StateTodo, listId: ListId) => state.idsByList[listId],
      (state: StateTodo) => state.entities,
      (todoIds, entities) =>
        todoIds?.map((id: number) => entities[id]).filter((todo): todo is Todo => !!todo)
    ),
    selectTodo: (state, todoId: TodoId) => state.entities[todoId],
    selectTodosIds: (state, listId) => state.idsByList[listId],
    selectIdsByListIncludeListId: (state, listId) =>
      state.idsByList && Object.keys(state.idsByList)?.includes(listId) ? true : false,
    selectIsFetchTodosPending: (state) => state.fetchTodosStatus === 'pending',
    selectIsFetchTodosIdle: (state) => state.fetchTodosStatus === 'idle',
    selectIsDeleteTodoPending: (state) => state.fetchTodosStatus === 'pending',
    selectIsDeleteTodoIdle: (state) => state.fetchTodosStatus === 'idle',
    selectIsPatchTodoPending: (state) => state.fetchTodosStatus === 'pending',
    selectIsPatchTodoIdle: (state) => state.fetchTodosStatus === 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      deleteTodosRequest.fulfilled,
      (
        state,
        action: PayloadAction<{
          todoId: TodoId
          listId: ListId
        }>
      ) => {
        const { listId, todoId } = action.payload
        const entities = { ...state.entities }
        delete entities[todoId]

        return {
          ...state,
          deleteTodoStatus: 'success',
          entities: entities,
          idsByList: {
            ...state.idsByList,
            [listId]: state.idsByList[listId].filter((id: TodoId) => id !== todoId)
          }
        }
      }
    )
    builder.addCase(deleteTodosRequest.rejected, (state) => {
      state.deleteTodoStatus = 'failed'
    })
    builder.addCase(deleteTodosRequest.pending, (state) => {
      state.deleteTodoStatus = 'pending'
    })
    builder.addCase(
      listsSlice.actions.deleteList.fulfilled,
      (
        state,
        action: PayloadAction<{
          listId: ListId
        }>
      ) => {
        const entities = { ...state.entities }
        const todosIds = state.idsByList[action.payload.listId]
        todosIds.forEach((todoId: TodoId) => delete entities[todoId])

        const idsByList = { ...state.idsByList }
        delete idsByList[action.payload.listId]

        return {
          ...state,
          entities: entities,
          idsByList: idsByList
        }
      }
    )
    builder.addCase(listsSlice.actions.createList.fulfilled, (state, action: PayloadAction<List>) => ({
      ...state,
      idsByList: {
        ...state.idsByList,
        [action.payload.id]: []
      }
    }))
    builder.addCase(
      getTodosRequest.fulfilled,
      (
        state,
        action: PayloadAction<{
          entities: Record<TodoId, Todo>
          idsByList: Record<ListId, TodoId[]>
        }>
      ) => {
        console.log(state?.entities)
        console.log({
          ...state,
          fetchTodosStatus: 'success',
          entities: { ...state?.entities, ...action.payload.entities },
          idsByList: { ...state?.idsByList, ...action.payload.idsByList }
        })
        return {
          ...state,
          fetchTodosStatus: 'success',
          entities: { ...state?.entities, ...action.payload.entities },
          idsByList: { ...state?.idsByList, ...action.payload.idsByList }
        }
      }
    )
    builder.addCase(getTodosRequest.rejected, (state) => {
      state.fetchTodosStatus = 'failed'
    })
    builder.addCase(getTodosRequest.pending, (state) => {
      state.fetchTodosStatus = 'pending'
    })
    builder.addCase(
      postTodosRequest.fulfilled,
      (
        state,
        action: PayloadAction<{
          todo: Todo
          listId: ListId
        }>
      ) => ({
        ...state,
        postTodosStatus: 'success',
        entities: { ...state.entities, [action.payload.todo.id]: action.payload.todo },
        idsByList: {
          ...state.idsByList,
          [action.payload.listId]: [action.payload.todo.id, ...state.idsByList[action.payload.listId]]
        }
      })
    )
    builder.addCase(postTodosRequest.rejected, (state) => {
      state.postTodosStatus = 'failed'
    })
    builder.addCase(postTodosRequest.pending, (state) => {
      state.postTodosStatus = 'pending'
    })
    builder.addCase(
      patchTodosRequest.fulfilled,
      (
        state,
        action: PayloadAction<{
          todoId: TodoId
          todo: Todo
        }>
      ) => {
        const { todoId, todo } = action.payload
        return {
          ...state,
          patchTodosStatus: 'success',
          entities: {
            ...state.entities,
            [todoId]: { ...state.entities[todoId], ...todo }
          }
        }
      }
    )
    builder.addCase(patchTodosRequest.rejected, (state) => {
      state.patchTodosStatus = 'failed'
    })
    builder.addCase(patchTodosRequest.pending, (state) => {
      state.patchTodosStatus = 'pending'
    })
  }
})
