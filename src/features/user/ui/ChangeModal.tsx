import React from 'react'

import { patchUserRequest } from '@/entities/user/model/patchUser'
import { userSlice } from '@/entities/user/user.slice'
import { Button, Modal } from '@/shared/components'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'

export type ChangeModalProps = {
  isOpenModal: boolean
  setOpenModal: (value: boolean) => void
}

export const ChangeModal = ({ isOpenModal, setOpenModal }: ChangeModalProps) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(userSlice.selectors.selectUser)!
  const [name, setName] = React.useState(user.name)

  return (
    <Modal open={() => setOpenModal(!isOpenModal)} isOpen={isOpenModal}>
      <h5>Введеите новое имя:</h5>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          dispatch(patchUserRequest({ params: { name } }))
          setOpenModal(false)
        }}
      >
        <label>Имя</label>
        <input defaultValue={user.name} name="name" onChange={(event) => setName(event.target.value)} />
        <Button type="submit">Изменить</Button>
      </form>
    </Modal>
  )
}
