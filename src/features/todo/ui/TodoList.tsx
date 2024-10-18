import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/entities/store'
import { todosSlice } from '@/entities/todo/todo.slice'
import { AddButton } from '@/shared/components'

import { TodoComponent } from './Todo'

export const TodoList = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const todosIds = useAppSelector((state) => todosSlice.selectors.selectTodosIds(state, Number(id)))

  return (
    <div className="flex w-full flex-col items-start">
      <AddButton
        dispatch={(name) =>
          dispatch(
            todosSlice.actions.createTodo({
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
        todosIds.map((todoId) => <TodoComponent todoId={todoId} key={todoId} />)
      ) : (
        <p>Empty...</p>
      )}
    </div>
  )
}
