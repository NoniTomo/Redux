import type { GetListsRequestConfig } from '@/shared/api/requests'
import { createAppAsyncThunk } from '@/shared/lib/store'

import type { List, ListId } from '../list.slice'

export const getListsRequest = createAppAsyncThunk(
  'lists/getListsRequest',
  async (params: GetListsRequestConfig, thunkApi) =>
    thunkApi.extra.api.getLists(params).then((res) => ({
      entities: res.data.items.reduce(
        (entities, list) => {
          entities[list.id] = list
          return entities
        },
        {} as Record<ListId, List>
      ),
      ids: res.data.items.map((list) => list.id)
    }))
)
