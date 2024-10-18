import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from '@reduxjs/toolkit'
import clsx from 'clsx'

import { changeListAction, deleteListAction, type ListId } from '@/entities/list/store/actions'
import { useAppSelector } from '@/entities/store'
import { FormName, Menu } from '@/shared/components'

export interface ListComponentProps {
  listId: ListId
}

export const ListComponent = ({ listId }: ListComponentProps) => {
  const dispatch = useDispatch()
  const entities = useAppSelector((state) => state.lists.entities)

  const [isEdit, setEdit] = React.useState(false)

  const actions = bindActionCreators(
    {
      changeListAction,
      deleteListAction
    },
    dispatch
  )

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
                actions.changeListAction({
                  listId,
                  name
                })
              }
              defaultName={entities[listId].name}
            />
          </div>
          <Menu
            className={clsx(
              'h-min p-1 hover:bg-gray-300',
              isActive && 'h-min p-1 hover:bg-lime-500',
              isPending && 'h-min p-1 hover:bg-gray-300'
            )}
            editFunction={() => setEdit(true)}
            deleteFunction={() =>
              actions.deleteListAction({
                listId: listId
              })
            }
          />
        </>
      )}
    </NavLink>
  )
}
