import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { State } from '@/entities/store'
import type { TodoId } from '@/entities/todo/todo.slice'
import { todosSlice } from '@/entities/todo/todo.slice'
import { FormName } from '@/shared/components/FormName'
import { Menu } from '@/shared/components/Menu'

import { Checkbox } from './Checkbox'

export interface TodoProps {
  todoId: TodoId
}

export const TodoComponent = ({ todoId, ...props }: TodoProps) => {
  const dispatch = useDispatch()
  const todo = useSelector((state: State) => todosSlice.selectors.selectTodo(state, todoId))

  const [isEdit, setEdit] = React.useState(false)

  return (
    <div className="m-auto flex w-auto w-full max-w-96 justify-between" {...props}>
      <div className="flex items-center space-x-4">
        <Checkbox todoId={todoId} />
        <FormName
          isEdit={isEdit}
          setEdit={setEdit}
          dispatch={(name: string) =>
            dispatch(
              todosSlice.actions.changeTodo({
                todo: {
                  listId: todo.listId,
                  value: todo.value,
                  name
                },
                todoId: todo.id
              })
            )
          }
          defaultName={todo.name}
          onClick={() => {
            dispatch(
              todosSlice.actions.changeTodo({
                todo: {
                  listId: todo.listId,
                  value: !todo.value,
                  name: todo.name
                },
                todoId: todo.id
              })
            )
          }}
        />
      </div>
      <Menu
        editFunction={() => setEdit(true)}
        deleteFunction={() =>
          dispatch(
            todosSlice.actions.deleteTodo({
              todoId: todoId,
              listId: todo.listId
            })
          )
        }
      />
    </div>
  )
}
