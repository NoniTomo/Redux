import type { ListId } from '@/entities/list/list.slice'
import { instance } from '@/shared/api'

export type DeleteListIdRequestParams = {
  listId: ListId
}

export type DeleteListIdRequestConfig = RequestConfig<DeleteListIdRequestParams>

export const deleteListId = async ({ params, config }: DeleteListIdRequestConfig) =>
  instance.delete(`/lists/${params.listId}`, config)
