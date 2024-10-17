import React from 'react'
import { useSelector } from 'react-redux'
import { IconPencil } from '@tabler/icons-react'

import type { State } from '@/entities/store'
import { useAppDispatch } from '@/entities/store'
import type { UpdateUsername } from '@/entities/user/actions'
import { AvatarButton } from '@/features/user/ui/AvatarButton'
import { LogoutButton } from '@/features/user/ui/LogoutButton'
import { Button, Modal, Popover, PopoverContent, PopoverTrigger } from '@/shared/components'

export const HeaderMenu = () => {
  const dispatch = useAppDispatch()
  const username = useSelector((state: State) => state.user.name)
  const [isOpenMenu, setOpenMenu] = React.useState(false)
  const [isOpenModal, setOpenModal] = React.useState(false)
  const [name, setName] = React.useState(username)

  return (
    <>
      <Popover open={isOpenMenu}>
        <PopoverTrigger asChild>
          <AvatarButton onClick={() => setOpenMenu(!isOpenMenu)} name={username} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setOpenMenu(false)
                setOpenModal(!isOpenModal)
              }}
              className="p-2"
            >
              <IconPencil className="size-5" />
              <span>Изменить</span>
            </Button>
            <LogoutButton />
          </div>
        </PopoverContent>
      </Popover>
      <Modal open={() => setOpenModal(!isOpenModal)} isOpen={isOpenModal}>
        <h5>Введеите новое имя:</h5>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            dispatch({ type: 'updateUserName', payload: { name } } satisfies UpdateUsername)
            setOpenModal(false)
          }}
        >
          <label>Имя</label>
          <input value={name} name="name" onChange={(event) => setName(event.target.value)} />
          <Button type="submit">Изменить</Button>
        </form>
      </Modal>
    </>
  )
}
