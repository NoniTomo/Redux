import type { ListId } from '@/entities/list/list.slice'
import type { Todo, TodoId } from '@/entities/todo/todo.slice'
import { instance } from '@/shared/api'

export type PatchListsIdTodosIdResponse = {
  todo: Todo
}

export type PatchListsIdTodosIdRequest = {
  todo: Todo
}

export type PatchListsIdTodosIdRequestParams = {
  listId: ListId
  todoId: TodoId
}

export type PatchListsIdTodosIdRequestConfig = RequestConfig<
  PatchListsIdTodosIdRequestParams & PatchListsIdTodosIdRequest
>

export const patchListsIdTodosId = async ({ params, config }: PatchListsIdTodosIdRequestConfig) =>
  instance.patch<PatchListsIdTodosIdResponse>(
    `/lists/${params.listId}/todos/${params.todoId}`,
    params,
    config
  )
