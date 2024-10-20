import type { AppThunk } from '@/entities/store'

import { listsSlice } from '../list.slice'

export const getListsRequest =
  (): AppThunk =>
  (dispatch, getState, { api }) => {
    const isIdle = listsSlice.selectors.selectIsFetchListsIdle(getState())
    if (!isIdle) return
    dispatch(listsSlice.actions.fetchListsPending())
    api
      .getLists()
      .then((lists) => {
        dispatch(listsSlice.actions.fetchListsSuccess(lists))
      })
      .catch(() => {
        dispatch(listsSlice.actions.fetchListsFailed())
      })
  }
