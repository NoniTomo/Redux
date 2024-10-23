import type { PostListsRequestConfig } from '@/shared/api/requests'
import { createAppAsyncThunk } from '@/shared/lib/store'

export const postListsRequst = createAppAsyncThunk(
  'todos/postListsRequst',
  (params: PostListsRequestConfig, thunkApi) => thunkApi.extra.api.postLists(params)
)
