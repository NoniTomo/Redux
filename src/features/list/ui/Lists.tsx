import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import type {
  ChangeListAction,
  CreateListAction,
  DeleteListAction,
  ListId
} from '@/entities/list/store/actions'
import { useAppSelector } from '@/entities/store'
import { AddButton, FormName, Menu } from '@/shared/components'

export const Lists = () => {
  const dispatch = useDispatch()
  const listsIds = useAppSelector((state) => state.lists.ids)
  const entities = useAppSelector((state) => state.lists.entities)

  const [isEdit, setEdit] = React.useState(false)

  return (
    <>
      <AddButton
        dispatch={(name: string) => {
          return dispatch({
            type: 'createList',
            payload: {
              id: 1,
              name: name
            }
          } satisfies CreateListAction)
        }}
      />
      <ul className="flex flex-col gap-1">
        {listsIds.map((listId: ListId) => (
          <li className="cursor-pointer" key={listId}>
            <NavLink
              to={`/list/${listId}`}
              className={({ isActive, isPending }) =>
                isPending
                  ? 'flex w-full items-center justify-between rounded bg-gray-200 px-2'
                  : isActive
                    ? 'flex w-full items-center justify-between rounded bg-lime-400 px-2'
                    : 'flex w-full items-center justify-between rounded px-2 hover:bg-gray-200'
              }
            >
              <FormName
                isEdit={isEdit}
                setEdit={setEdit}
                dispatch={(name) =>
                  dispatch({
                    type: 'changeList',
                    payload: {
                      listId,
                      name
                    }
                  } satisfies ChangeListAction)
                }
                defaultName={entities[listId].name}
              />
              <Menu
                editFunction={() => setEdit(true)}
                deleteFunction={() =>
                  dispatch({
                    type: 'deleteList',
                    payload: {
                      listId: listId
                    }
                  } satisfies DeleteListAction)
                }
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}
