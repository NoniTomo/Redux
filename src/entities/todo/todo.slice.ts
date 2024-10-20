import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'

import { initialState } from '../initialState'
import { type List, type ListId, listsSlice } from '../list/list.slice'

export type TodoId = number

export interface Todo {
  listId: ListId
  id: TodoId
  name: string
  value: boolean
}

export interface StateTodo {
  entities: Record<TodoId, Todo>
  idsByList: Record<ListId, TodoId[]>
  fetchTodosStatus: 'idle' | 'pending' | 'success' | 'failed'
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState.todos,
  selectors: {
    selectTodosByListId: createSelector(
      (state: StateTodo, listId: ListId) => state.idsByList[listId],
      (state: StateTodo) => state.entities,
      (todoIds, entities) => todoIds.map((id: number) => entities[id])
    ),
    selectTodo: (state, todoId: TodoId) => state.entities[todoId],
    selectTodosIds: (state, listId) => state.idsByList[listId],
    selectIsFetchTodosPending: (state) => state.fetchTodosStatus === 'pending',
    selectIsFetchTodosIdle: (state) => state.fetchTodosStatus === 'idle'
  },
  reducers: {
    createTodo: (
      state,
      action: PayloadAction<{
        todo: Todo
        listId: ListId
      }>
    ) => ({
      ...state,
      entities: { ...state.entities, [action.payload.todo.id]: action.payload.todo },
      idsByList: {
        ...state.idsByList,
        [action.payload.listId]: [action.payload.todo.id, ...state.idsByList[action.payload.listId]]
      }
    }),
    deleteTodo: (
      state,
      action: PayloadAction<{
        todoId: TodoId
        listId: ListId
      }>
    ) => {
      const { todoId, listId } = action.payload
      const entities = { ...state.entities }
      delete entities[todoId]

      return {
        ...state,
        entities: entities,
        idsByList: {
          ...state.idsByList,
          [listId]: state.idsByList[listId].filter((id: TodoId) => id !== todoId)
        }
      }
    },
    changeTodo: (
      state,
      action: PayloadAction<{
        todoId: TodoId
        todo: Omit<Todo, 'id'>
      }>
    ) => {
      const { todoId, todo } = action.payload
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: { ...state.entities[todoId], ...todo }
        }
      }
    },
    fetchTodosPending: (state) => {
      state.fetchTodosStatus = 'pending'
    },
    fetchTodosFailed: (state) => {
      state.fetchTodosStatus = 'failed'
    },
    fetchTodosSuccess: (
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
  },
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
  }
})
