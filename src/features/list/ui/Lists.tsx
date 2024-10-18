import { useDispatch } from 'react-redux'

import type { ListId } from '@/entities/list/list.slice'
import { listsSlice } from '@/entities/list/list.slice'
import { useAppSelector } from '@/entities/store'
import { AddButton } from '@/shared/components'

import { ListComponent } from './ListComponent'

export const Lists = () => {
  const dispatch = useDispatch()
  const listsIds = useAppSelector((state) => state.lists.ids)

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
