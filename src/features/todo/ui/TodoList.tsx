import { useParams } from 'react-router-dom'

import type { State } from '@/entities/store'
import { useAppDispatch, useAppSelector } from '@/entities/store'
import type { TodoId } from '@/entities/todo/store/actions'
import { createTodoAction } from '@/entities/todo/store/actions'
import { AddButton } from '@/shared/components'

import { TodoComponent } from './Todo'

export const TodoList = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const todosIds = useAppSelector((state: State) => state.todos.idsByList[Number(id)])

  return (
    <div className="flex w-full flex-col items-start">
      <AddButton
        dispatch={(name) =>
          dispatch(
            createTodoAction({
              listId: Number(id),
              todo: {
                listId: Number(id),
                id: 1,
                name: name,
                value: false
              }
            })
          )
        }
      />
      {todosIds?.length ? (
        todosIds.map((todoId: TodoId) => <TodoComponent todoId={todoId} key={todoId} />)
      ) : (
        <p>Empty...</p>
      )}
    </div>
  )
}
