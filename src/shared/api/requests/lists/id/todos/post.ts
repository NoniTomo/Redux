import type { ListId } from '@/entities/list/list.slice'
import type { Todo } from '@/entities/todo/todo.slice'
import { instance } from '@/shared/api'

export type PostListsIdTodosResponse = {
  todo: Todo
}

export type PostListsIdTodosRequest = {
  name: string
}

export type PostListsIdTodosRequestParams = {
  listId: ListId
}

export type PostListsIdTodosRequestConfig = RequestConfig<
  PostListsIdTodosRequestParams & PostListsIdTodosRequest
>

export const postListsIdTodos = async ({ params, config }: PostListsIdTodosRequestConfig) =>
  instance.post<PostListsIdTodosResponse>(`/lists/${params.listId}/todos`, params, config)
