import { useParams } from 'react-router-dom'

import type { State } from '@/entities/store'
import { useAppDispatch, useAppSelector } from '@/entities/store'
import type { CreateTodoAction, TodoId } from '@/entities/todo/store/actions'
import { AddButton } from '@/shared/components'

import { TodoComponent } from './Todo'

export const TodoList = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const todosIds = useAppSelector((state: State) => state.todos.idsByList[Number(id)])

  if (!todosIds?.length) return <p>Empty...</p>

  return (
    <div className="flex w-full flex-col items-start">
      <AddButton
        dispatch={(name) =>
          dispatch({
            type: 'createTodo',
            payload: {
              listId: Number(id),
              todo: {
                id: 1,
                name: name,
                value: false
              }
            }
          } satisfies CreateTodoAction)
        }
      />
      {todosIds.map((todoId: TodoId) => (
        <TodoComponent todoId={todoId} key={todoId} />
      ))}
    </div>
  )
}
