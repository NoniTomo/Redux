import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'

import type { ExtraArgument } from '@/shared/lib/store'
import { createSlice } from '@/shared/lib/store'

//import { initialState } from '../initialState'
import { type List, type ListId, listsSlice } from '../list/list.slice'

import { getTodosRequest } from './model/getTodos'
import { patchTodos } from './model/patchTodos'
import { postTodos } from './model/postTodos'

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

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  selectors: {
    selectTodosByListId: createSelector(
      (state: StateTodo, listId: ListId) => state.idsByList[listId],
      (state: StateTodo) => state.entities,
      (todoIds, entities) =>
        todoIds.map((id: number) => entities[id]).filter((todo): todo is Todo => !!todo)
    ),
    selectTodo: (state, todoId: TodoId) => state.entities[todoId],
    selectTodosIds: (state, listId) => state.idsByList[listId],
    selectIsFetchTodosPending: (state) => state.fetchTodosStatus === 'pending',
    selectIsFetchTodosIdle: (state) => state.fetchTodosStatus === 'idle',
    selectIsDeleteTodoPending: (state) => state.fetchTodosStatus === 'pending',
    selectIsDeleteTodoIdle: (state) => state.fetchTodosStatus === 'idle',
    selectIsPatchTodoPending: (state) => state.fetchTodosStatus === 'pending',
    selectIsPatchTodoIdle: (state) => state.fetchTodosStatus === 'idle'
  },
  reducers: (creator) => ({
    deleteTodo: creator.asyncThunk<
      {
        todoId: TodoId
        listId: ListId
      },
      {
        todoId: TodoId
        listId: ListId
      },
      { extra: ExtraArgument }
    >(
      ({ todoId, listId }, thunkApi) => {
        thunkApi.extra.api.deleteListsIdTodosId({
          params: { todoId: Number(todoId), listId: Number(listId) }
        })
        return { todoId, listId }
      },
      {
        pending: (state) => {
          state.deleteTodoStatus = 'pending'
        },
        rejected: (state) => {
          state.deleteTodoStatus = 'failed'
        },
        fulfilled: (state, action) => {
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
      }
    )
  }),
  extraReducers: (builder) => {
    builder.addCase(
      listsSlice.actions.deleteList,
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
    builder.addCase(listsSlice.actions.createList, (state, action: PayloadAction<List>) => ({
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
      ) => ({
        ...state,
        fetchTodosStatus: 'success',
        entities: action.payload.entities,
        idsByList: action.payload.idsByList
      })
    )
    builder.addCase(getTodosRequest.rejected, (state) => {
      state.fetchTodosStatus = 'failed'
    })
    builder.addCase(getTodosRequest.pending, (state) => {
      state.fetchTodosStatus = 'pending'
    })
    builder.addCase(
      postTodos.fulfilled,
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
    builder.addCase(postTodos.rejected, (state) => {
      state.postTodosStatus = 'failed'
    })
    builder.addCase(postTodos.pending, (state) => {
      state.postTodosStatus = 'pending'
    })
    builder.addCase(
      patchTodos.fulfilled,
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
    builder.addCase(patchTodos.rejected, (state) => {
      state.patchTodosStatus = 'failed'
    })
    builder.addCase(patchTodos.pending, (state) => {
      state.patchTodosStatus = 'pending'
    })
  }
})
