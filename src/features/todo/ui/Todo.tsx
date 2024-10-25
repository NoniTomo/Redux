import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { deleteTodosRequest } from '@/entities/todo/model/deleteTodos'
import { patchTodosRequest } from '@/entities/todo/model/patchTodos'
import type { Todo, TodoId } from '@/entities/todo/todo.slice'
import { todosSlice } from '@/entities/todo/todo.slice'
import { FormName } from '@/shared/components/FormName'
import { Menu } from '@/shared/components/Menu'
import { type State, useAppDispatch } from '@/shared/lib/store'

import { Checkbox } from './Checkbox'

export interface TodoProps {
  todoId: TodoId
}

export const TodoComponent = ({ todoId, ...props }: TodoProps) => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const todo = useSelector((state: State) => todosSlice.selectors.selectTodo(state, todoId))
  const isDeletePending = useSelector(todosSlice.selectors.selectIsDeleteTodoPending)

  const [isEdit, setEdit] = React.useState(false)

  if (!todo) return null

  const onChangeTodo = ({ name, value }: Partial<Todo>) =>
    dispatch(
      patchTodosRequest({
        params: {
          todo: {
            ...todo,
            value: value ?? todo.value,
            name: name ?? todo.name
          },
          todoId: todo.id,
          listId: todo.listId
        }
      })
    )

  return (
    <div className="m-auto flex w-auto w-full max-w-96 justify-between" {...props}>
      <div className="flex items-center space-x-4">
        <Checkbox todoId={todoId} />
        <FormName
          isEdit={isEdit}
          setEdit={setEdit}
          dispatch={(name: string) => onChangeTodo({ name })}
          defaultName={todo.name}
          onClick={() => onChangeTodo({ value: todo.value! })}
        />
      </div>
      <Menu
        editFunction={() => setEdit(true)}
        deleteFunction={() =>
          dispatch(deleteTodosRequest({ params: { listId: Number(params.listId), todoId: todo.id } }))
        }
        isDeletePending={isDeletePending}
      />
    </div>
  )
}
