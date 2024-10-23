import type { ListId } from '@/entities/list/list.slice'
import { listsSlice } from '@/entities/list/list.slice'
import { AddButton } from '@/shared/components'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'

import { ListComponent } from './ListComponent'

export const Lists = () => {
  const dispatch = useAppDispatch()
  const selectIsFetchListsPending = useAppSelector(listsSlice.selectors.selectIsFetchListsPending)
  const listsIds = useAppSelector(listsSlice.selectors.selectIsListsIds)
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
