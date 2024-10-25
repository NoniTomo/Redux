import type { GetUserRequestConfig } from '@/shared/api/requests'
import { createAppAsyncThunk } from '@/shared/lib/store'

import { userSlice } from '../user.slice'

export const getUserRequest = createAppAsyncThunk(
  'user/getUser',
  async (params: GetUserRequestConfig & { refetch: boolean }, thunkApi) =>
    (await thunkApi.extra.api.getUser(params)).data,
  {
    condition(arg, thunkApi) {
      const isIdle = userSlice.selectors.selectIsFetchUsersIdle(thunkApi.getState())

      if (!isIdle && !arg.refetch) return false

      return true
    }
  }
)
