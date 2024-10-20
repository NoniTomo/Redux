import type { ListId } from '@/entities/list/list.slice'
import type { TodoId } from '@/entities/todo/todo.slice'
import { instance } from '@/shared/api'

export type DeleteListsIdTodosIdRequestParams = {
  listId: ListId
  todoId: TodoId
}

export type DeleteListsIdTodosIdRequestConfig = RequestConfig<DeleteListsIdTodosIdRequestParams>

export const deleteListsIdTodosIdConfig = async ({
  params,
  config
}: DeleteListsIdTodosIdRequestConfig) =>
  instance.delete(`/lists/${params.listId}/todos/${params.todoId}`, config)
