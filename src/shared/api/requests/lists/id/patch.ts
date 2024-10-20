import type { ListId } from '@/entities/list/list.slice'
import { instance } from '@/shared/api'

export type PatchListIdRequest = {
  name: string
}

export type PatchListIdRequestParams = {
  listId: ListId
}

export type PatchListIdRequestConfig = RequestConfig<PatchListIdRequest & PatchListIdRequestParams>

export const patchListId = async ({ params, config }: PatchListIdRequestConfig) =>
  instance.patch(`/lists/${params.listId}`, params, config)
