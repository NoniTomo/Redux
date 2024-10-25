import type { PatchUserRequestConfig } from '@/shared/api/requests'
import { createAppAsyncThunk } from '@/shared/lib/store'

export const patchUserRequest = createAppAsyncThunk(
  'user/patchUserRequest',
  async (params: PatchUserRequestConfig, thunkApi) => (await thunkApi.extra.api.patchUser(params)).data
)
