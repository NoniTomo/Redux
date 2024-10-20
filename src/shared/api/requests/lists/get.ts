import type { ListId } from '@/entities/list/list.slice'

import { instance } from '../../index'

export type ListsResponse = {
  items: List[]
}

export type List = {
  id: number
  name: string
}

export type GetListsRequestConfig = RequestConfig

export const getLists = async (params?: GetListsRequestConfig) =>
  instance.get<ListsResponse>('/lists', params?.config).then((res) => ({
    entities: res.data.items.reduce(
      (entities, list) => {
        entities[list.id] = list
        return entities
      },
      {} as Record<ListId, List>
    ),
    ids: res.data.items.map((list) => list.id)
  }))
