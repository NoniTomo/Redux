import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import type { State } from '@/entities/store'
import type { ChangeTodoAction, DeleteTodoAction, TodoId } from '@/entities/todo/store/actions'
import { selectTodo } from '@/entities/todo/store/selectors'
import { FormName } from '@/shared/components/FormName'
import { Menu } from '@/shared/components/Menu'

import { Checkbox } from './Checkbox'

export interface TodoProps {
  todoId: TodoId
}

export const TodoComponent = ({ todoId, ...props }: TodoProps) => {
  const { id } = useParams()
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
            dispatch({
              type: 'changeTodo',
              payload: {
                todo: {
                  value: todo.value,
                  name
                },
                todoId: todo.id
              }
            } satisfies ChangeTodoAction)
          }
          defaultName={todo.name}
          onClick={() => {
            dispatch({
              type: 'changeTodo',
              payload: {
                todo: {
                  value: !todo.value,
                  name: todo.name
                },
                todoId: todo.id
              }
            } satisfies ChangeTodoAction)
          }}
        />
      </div>
      <Menu
        editFunction={() => setEdit(true)}
        deleteFunction={() =>
          dispatch({
            type: 'deleteTodo',
            payload: {
              todoId: todoId,
              listId: Number(id)
            }
          } satisfies DeleteTodoAction)
        }
      />
    </div>
  )
}
