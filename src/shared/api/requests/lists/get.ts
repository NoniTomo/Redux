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
  instance.get<ListsResponse>('/lists', params?.config)
