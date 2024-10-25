import type { GetUserRequestConfig } from '@/shared/api/requests'
import { createAppAsyncThunk } from '@/shared/lib/store'

export const logoutUserRequest = createAppAsyncThunk(
  'user/logoutUser',
  async (params: GetUserRequestConfig, thunkApi) => await thunkApi.extra.api.logoutUser(params)
)
