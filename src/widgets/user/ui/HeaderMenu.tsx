import React from 'react'
import { useSelector } from 'react-redux'
import { IconPencil } from '@tabler/icons-react'

import type { State } from '@/entities/store'
import { useAppDispatch } from '@/entities/store'
import { updateUsername } from '@/entities/user/actions'
import { LogoutButton } from '@/features/user/ui/LogoutButton'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Modal,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/components'

const MAX_NAME_LENGTH = 10

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
          <Button
            onClick={() => setOpenMenu(!isOpenMenu)}
            variant="ghost"
            className="inline-flex h-12 w-max max-w-60 cursor-pointer items-center justify-between gap-3 hover:bg-lime-500"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-white">
              {username.length > MAX_NAME_LENGTH
                ? username.slice(0, MAX_NAME_LENGTH - 3) + '...'
                : username}
            </span>
          </Button>
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
            dispatch(updateUsername({ name }))
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
