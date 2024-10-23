import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

import { type ListId, listsSlice } from '@/entities/list/list.slice'
import { FormName, Menu } from '@/shared/components'
import { useAppSelector } from '@/shared/lib/store'

export interface ListComponentProps {
  listId: ListId
}

export const ListComponent = ({ listId }: ListComponentProps) => {
  const dispatch = useDispatch()
  const entities = useAppSelector((state) => state.lists.entities)

  const [isEdit, setEdit] = React.useState(false)

  return (
    <NavLink
      to={`/list/${listId}`}
      className={({ isActive, isPending }) =>
        isPending
          ? 'flex w-full items-center justify-between rounded bg-gray-300 px-2 py-1'
          : isActive
            ? 'flex w-full items-center justify-between rounded bg-lime-400 px-2 py-1'
            : 'flex w-full items-center justify-between rounded px-2 py-1 hover:bg-gray-200'
      }
    >
      {({ isActive, isPending }) => (
        <>
          <div className="max-w-[calc(100%-28px)]">
            <FormName
              isEdit={isEdit}
              setEdit={setEdit}
              dispatch={(name) =>
                dispatch(
                  listsSlice.actions.changeList({
                    listId,
                    name
                  })
                )
              }
              defaultName={entities[listId].name}
            />
          </div>
          <div
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
            }}
          >
            <Menu
              className={clsx(
                'h-min p-1 hover:bg-gray-300',
                isActive && 'h-min p-1 hover:bg-lime-500',
                isPending && 'h-min p-1 hover:bg-gray-300'
              )}
              editFunction={() => setEdit(true)}
              deleteFunction={() =>
                dispatch(
                  listsSlice.actions.deleteList({
                    listId: listId
                  })
                )
              }
            />
          </div>
        </>
      )}
    </NavLink>
  )
}
