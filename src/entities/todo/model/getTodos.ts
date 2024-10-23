import type { ListId } from '@/entities/list/list.slice'
import type { GetListsIdTodosRequestConfig } from '@/shared/api/requests/lists/id/todos/get'
import { createAppAsyncThunk } from '@/shared/lib/store'

import type { Todo, TodoId } from '../todo.slice'
import { todosSlice } from '../todo.slice'
/* 
export const getTodosRequest =
  ({ listId, refetch }: { listId: number; refetch?: boolean }): AppThunk<Promise<void>> =>
  async (dispatch, getState, { api }) => {
    const isIdle = todosSlice.selectors.selectIsFetchTodosIdle(getState())

    if (!isIdle && !refetch) return

    dispatch(todosSlice.actions.fetchTodosPending())

    return api
      .getListsIdTodosConfig({ params: { listId: Number(listId) } })
      .then((todos) => {
        dispatch(todosSlice.actions.fetchTodosSuccess(todos))
      })
      .catch(() => {
        dispatch(todosSlice.actions.fetchTodosFailed())
      })
  }
 */

export const getTodosRequest = createAppAsyncThunk(
  'todos/getTodosRequest',
  (params: GetListsIdTodosRequestConfig & { refetch?: boolean }, thunkApi) =>
    thunkApi.extra.api.getListsIdTodos(params).then((res) => ({
      entities: res.data.items.reduce(
        (entities, todo) => {
          entities[todo.id] = todo
          return entities
        },
        {} as Record<TodoId, Todo>
      ),
      idsByList: res.data.items.reduce(
        (idsByList, todo) => {
          idsByList[todo.listId] = [...(idsByList[todo.listId] ?? []), todo.id]
          return idsByList
        },
        {} as Record<ListId, TodoId[]>
      )
    })),
  {
    condition(arg, thunkApi) {
      const isIdle = todosSlice.selectors.selectIsFetchTodosIdle(thunkApi.getState())

      if (!isIdle && !arg.refetch) return false

      return true
    }
  }
)
