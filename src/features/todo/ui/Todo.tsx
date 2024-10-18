import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { State } from '@/entities/store'
import type { TodoId } from '@/entities/todo/store/actions'
import { changeTodoAction, deleteTodoAction } from '@/entities/todo/store/actions'
import { selectTodo } from '@/entities/todo/store/selectors'
import { FormName } from '@/shared/components/FormName'
import { Menu } from '@/shared/components/Menu'

import { Checkbox } from './Checkbox'

export interface TodoProps {
  todoId: TodoId
}

export const TodoComponent = ({ todoId, ...props }: TodoProps) => {
  const dispatch = useDispatch()
  const todo = useSelector((state: State) => selectTodo(state, todoId))

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
              changeTodoAction({
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
              changeTodoAction({
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
            deleteTodoAction({
              todoId: todoId,
              listId: todo.listId
            })
          )
        }
      />
    </div>
  )
}
