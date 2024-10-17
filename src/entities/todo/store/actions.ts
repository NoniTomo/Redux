import type { ListId } from '../../list/store/actions'

export type TodoId = number

export interface Todo {
  id: TodoId
  name: string
  value: boolean
}

export interface CreateTodoAction {
  type: 'createTodo'
  payload: {
    todo: Todo
    listId: ListId
  }
}
export interface DeleteTodoAction {
  type: 'deleteTodo'
  payload: {
    todoId: TodoId
    listId: ListId
  }
}
export interface ChangeTodoAction {
  type: 'changeTodo'
  payload: {
    todoId: TodoId
    todo: Omit<Todo, 'id'>
  }
}
export interface StoredTodoAction {
  type: 'storedTodo'
  payload: {
    entities: Record<TodoId, Todo>
    idsByList: Record<ListId, TodoId[]>
  }
}

export type ActionTodo = CreateTodoAction | ChangeTodoAction | DeleteTodoAction | StoredTodoAction
