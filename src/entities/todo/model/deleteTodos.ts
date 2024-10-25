import type { DeleteListsIdTodosIdRequestConfig } from '@/shared/api/requests'
import { createAppAsyncThunk } from '@/shared/lib/store'

export const deleteTodosRequest = createAppAsyncThunk(
  'todos/deleteTodos',
  async (params: DeleteListsIdTodosIdRequestConfig, thunkApi) => {
    await thunkApi.extra.api.deleteListsIdTodosId(params)
    return params.params
  }
)
