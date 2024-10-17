export type ListId = number

export interface List {
  id: ListId
  name: string
}

export interface CreateListAction {
  type: 'createList'
  payload: List
}
export interface DeleteListAction {
  type: 'deleteList'
  payload: {
    listId: ListId
  }
}
export interface ChangeListAction {
  type: 'changeList'
  payload: {
    listId: ListId
    name: string
  }
}
export interface StoredListAction {
  type: 'storedList'
  payload: {
    entities: Record<ListId, List>
    ids: ListId[]
  }
}

export type ActionLists = CreateListAction | DeleteListAction | ChangeListAction | StoredListAction
