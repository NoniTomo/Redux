import { useDispatch } from 'react-redux'

import type { State } from '@/entities/store'
import { useAppSelector } from '@/entities/store'
import type { TodoId } from '@/entities/todo/todo.slice'
import { todosSlice } from '@/entities/todo/todo.slice'

export interface CheckboxProps {
  todoId: TodoId
}

export const Checkbox = ({ todoId }: CheckboxProps) => {
  const dispatch = useDispatch()
  const todo = useAppSelector((state: State) => todosSlice.selectors.selectTodo(state, todoId))

  return (
    <input
      className="transform-1 p-11 accent-lime-400"
      type="checkbox"
      checked={todo.value}
      onChange={(event) => {
        dispatch(
          todosSlice.actions.changeTodo({
            todo: {
              listId: todo.listId,
              value: event.target.checked,
              name: todo.name
            },
            todoId: todo.id
          })
        )
      }}
    />
  )
}
