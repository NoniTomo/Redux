import { createSelector } from '@reduxjs/toolkit'

import type { State } from '../../../app/store'

import type { TodoId } from './actions'

export const selectTodo = (state: State, todoId: TodoId) => state.todos.entities[todoId]

export const selectTodosByListId = (listId: number) =>
  createSelector(
    (state: State) => state.todos.idsByList[listId],
    (state: State) => state.todos.entities,
    (todoIds, entities) => todoIds.map((id: number) => entities[id])
  )
