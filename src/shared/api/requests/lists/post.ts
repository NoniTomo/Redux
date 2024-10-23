import type { ListId } from '@/entities/list/list.slice'
import { instance } from '@/shared/api'

export type CreateListResponse = {
  id: ListId
}

export type ListRequestParams = {
  name: string
}

export type PostListsRequestConfig = RequestConfig<ListRequestParams>

export const postLists = async ({ params, config }: PostListsRequestConfig) =>
  instance.post<CreateListResponse>('/lists', params, config)
