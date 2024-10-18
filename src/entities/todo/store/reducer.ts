import { createReducer } from '@reduxjs/toolkit'

import { initialState } from '@/entities/initialState'
import { createListAction, deleteListAction, type ListId } from '@/entities/list/store/actions'

import {
  changeTodoAction,
  createTodoAction,
  deleteTodoAction,
  storedTodoAction,
  type Todo,
  type TodoId
} from './actions'

export interface StateTodo {
  entities: Record<TodoId, Todo>
  idsByList: Record<ListId, TodoId[]>
}

export const reducerTodo = createReducer(initialState.todos, (builder) => {
  builder.addCase(createListAction, (state, action) => ({
    ...state,
    idsByList: {
      ...state.idsByList,
      [action.payload.id]: []
    }
  }))
  builder.addCase(createTodoAction, (state, action) => ({
    entities: { ...state.entities, [action.payload.todo.id]: action.payload.todo },
    idsByList: {
      ...state.idsByList,
      [action.payload.listId]: [action.payload.todo.id, ...state.idsByList[action.payload.listId]]
    }
  }))
  builder.addCase(deleteListAction, (state, action) => {
    const entities = { ...state.entities }
    const todosIds = state.idsByList[action.payload.listId]
    todosIds.forEach((todoId) => delete entities[todoId])

    const idsByList = { ...state.idsByList }
    delete idsByList[action.payload.listId]

    return {
      entities: entities,
      idsByList: idsByList
    }
  })
  builder.addCase(deleteTodoAction, (state, action) => {
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
  })
  builder.addCase(changeTodoAction, (state, action) => {
    const { todoId, todo } = action.payload
    return {
      ...state,
      entities: {
        ...state.entities,
        [todoId]: { ...state.entities[todoId], ...todo }
      }
    }
  })
  builder.addCase(storedTodoAction, (state, action) => ({
    entities: action.payload.entities,
    idsByList: action.payload.idsByList
  }))
})
