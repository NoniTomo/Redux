import type { ListId } from '@/entities/list/list.slice'
import type { Todo, TodoId } from '@/entities/todo/todo.slice'
import { instance } from '@/shared/api'

export type ListsIdTodosResponse = {
  items: Todo[]
}

export type GetListsIdTodosRequestParams = {
  listId: ListId
}

export type GetListsIdTodosRequestConfig = RequestConfig<GetListsIdTodosRequestParams>

export const getListsIdTodosConfig = async ({ params, config }: GetListsIdTodosRequestConfig) =>
  instance.get<ListsIdTodosResponse>(`/lists/${params.listId}/todos`, config).then((res) => ({
    entities: res.data.items.reduce(
      (entities, todo) => {
        entities[todo.id] = todo
        return entities
      },
      {} as Record<TodoId, Todo>
    ),
    idsByList: res.data.items.reduce(
      (idsByList, todo) => {
        idsByList[todo.listId].push(todo.id)
        return idsByList
      },
      {} as Record<ListId, TodoId[]>
    )
  }))
