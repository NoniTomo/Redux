export type UserId = number

export interface User {
  name: string
}

export interface UpdateUsername {
  type: 'updateUserName'
  payload: {
    name: string
  }
}
export interface Logout {
  type: 'logout'
}

export type ActionUser = UpdateUsername | Logout
