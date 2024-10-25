import { useParams } from 'react-router-dom'

import { postTodosRequest } from '@/entities/todo/model/postTodos'
import { todosSlice } from '@/entities/todo/todo.slice'
import { AddButton } from '@/shared/components'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'

import { TodoComponent } from './Todo'

export const TodoList = () => {
  const dispatch = useAppDispatch()
  const params = useParams()

  const todosIds = useAppSelector((state) =>
    todosSlice.selectors.selectTodosIds(state, Number(params.listId))
  )

  return (
    <div className="flex w-full flex-col items-start">
      <AddButton
        dispatch={(name) =>
          dispatch(
            postTodosRequest({
              params: {
                listId: Number(params.listId),
                name: name
              }
            })
          )
        }
      />
      {todosIds?.length ? (
        todosIds.map((todoId) => <TodoComponent todoId={todoId} key={todoId} />)
      ) : (
        <p>Empty...</p>
      )}
    </div>
  )
}
