import React from 'react'

import type { ListId } from '@/entities/list/list.slice'
import { listsSlice } from '@/entities/list/list.slice'
import { getListsRequest } from '@/entities/list/model/getLists'
import { useAppDispatch, useAppSelector, useAppStore } from '@/entities/store'
import { AddButton } from '@/shared/components'

import { ListComponent } from './ListComponent'

export const Lists = () => {
  const dispatch = useAppDispatch()
  const appStore = useAppStore()
  const listsIds = useAppSelector((state) => state.lists.ids)
  const selectIsFetchListsPending = useAppSelector(listsSlice.selectors.selectIsFetchListsPending)

  React.useEffect(() => {
    dispatch(getListsRequest)
  }, [dispatch, appStore])

  if (selectIsFetchListsPending) return <p>Loading...</p>

  return (
    <>
      <AddButton
        dispatch={(name: string) =>
          dispatch(
            listsSlice.actions.createList({
              id: 1,
              name: name
            })
          )
        }
      />
      <ul className="flex flex-col gap-1">
        {listsIds.map((listId: ListId) => (
          <li className="cursor-pointer" key={listId}>
            <ListComponent listId={listId} />
          </li>
        ))}
      </ul>
    </>
  )
}
