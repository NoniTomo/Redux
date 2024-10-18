import { useDispatch } from 'react-redux'

import type { State } from '@/entities/store'
import { useAppSelector } from '@/entities/store'
import type { TodoId } from '@/entities/todo/store/actions'
import { changeTodoAction } from '@/entities/todo/store/actions'
import { selectTodo } from '@/entities/todo/store/selectors'

export interface CheckboxProps {
  todoId: TodoId
}

export const Checkbox = ({ todoId }: CheckboxProps) => {
  const dispatch = useDispatch()
  const todo = useAppSelector((state: State) => selectTodo(state, todoId))

  return (
    <input
      className="transform-1 p-11 accent-lime-400"
      type="checkbox"
      checked={todo.value}
      onChange={(event) => {
        dispatch(
          changeTodoAction({
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
