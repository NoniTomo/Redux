import { createAction } from '@reduxjs/toolkit'

import type { ListId } from '../../list/store/actions'

export type TodoId = number

export interface Todo {
  listId: ListId
  id: TodoId
  name: string
  value: boolean
}

export const createTodoAction = createAction<{
  todo: Todo
  listId: ListId
}>('todos/createTodo')
export const deleteTodoAction = createAction<{
  todoId: TodoId
  listId: ListId
}>('todos/deleteTodo')
export const changeTodoAction = createAction<{
  todoId: TodoId
  todo: Omit<Todo, 'id'>
}>('todos/changeTodo')
export const storedTodoAction = createAction<{
  entities: Record<TodoId, Todo>
  idsByList: Record<ListId, TodoId[]>
}>('todos/storedTodo')
