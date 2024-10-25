import { patchTodosRequest } from '@/entities/todo/model/patchTodos'
import type { TodoId } from '@/entities/todo/todo.slice'
import { todosSlice } from '@/entities/todo/todo.slice'
import type { State } from '@/shared/lib/store'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'

export interface CheckboxProps {
  todoId: TodoId
}

export const Checkbox = ({ todoId }: CheckboxProps) => {
  const dispatch = useAppDispatch()
  const todo = useAppSelector((state: State) => todosSlice.selectors.selectTodo(state, todoId))

  if (!todo) return

  return (
    <input
      className="transform-1 p-11 accent-lime-400"
      type="checkbox"
      checked={todo?.value}
      onChange={(event) => {
        dispatch(
          patchTodosRequest({
            params: {
              todo: {
                id: todo.id,
                listId: todo.listId,
                value: event.target.checked,
                name: todo.name
              },
              listId: todo.listId,
              todoId: todo.id
            }
          })
        )
      }}
    />
  )
}
