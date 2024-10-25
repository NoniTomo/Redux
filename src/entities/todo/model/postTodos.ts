import type { PostListsIdTodosRequestConfig } from '@/shared/api/requests'
import { createAppAsyncThunk } from '@/shared/lib/store'

export const postTodosRequest = createAppAsyncThunk(
  'todos/postTodos',
  async (params: PostListsIdTodosRequestConfig, thunkApi) => ({
    todo: { ...(await thunkApi.extra.api.postListsIdTodos(params)).data.todo },
    listId: params.params.listId
  })
)
