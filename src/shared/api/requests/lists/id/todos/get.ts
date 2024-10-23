import type { ListId } from '@/entities/list/list.slice'
import type { Todo } from '@/entities/todo/todo.slice'
import { instance } from '@/shared/api'

export type ListsIdTodosResponse = {
  items: Todo[]
}

export type GetListsIdTodosRequestParams = {
  listId: ListId
}

export type GetListsIdTodosRequestConfig = RequestConfig<GetListsIdTodosRequestParams>

export const getListsIdTodos = async ({ params, config }: GetListsIdTodosRequestConfig) =>
  instance.get<ListsIdTodosResponse>(`/lists/${params.listId}/todos`, config)
