import type { PatchListsIdTodosIdRequestConfig } from '@/shared/api/requests/lists/id/todos/id/patch'
import { createAppAsyncThunk } from '@/shared/lib/store'

export const patchTodosRequest = createAppAsyncThunk(
  'todos/patchTodos',
  async (params: PatchListsIdTodosIdRequestConfig, thunkApi) => ({
    todo: { ...(await thunkApi.extra.api.patchListsIdTodosId(params)).data.todo },
    todoId: params.params.todoId
  })
)
