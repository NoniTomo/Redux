import { initialState } from '@/entities/initialState'
import type { Action } from '@/entities/store'

import type { User } from './actions'

export type StateUser = User

export const reducerUser = (state: StateUser = initialState.user, action: Action) => {
  switch (action.type) {
    case 'updateUserName': {
      return {
        ...state,
        name: action.payload.name
      }
    }
    case 'logout': {
      return {
        ...state,
        name: null
      }
    }
    default: {
      return state
    }
  }
}
