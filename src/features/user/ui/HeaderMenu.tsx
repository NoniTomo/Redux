import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AvatarImage } from '@radix-ui/react-avatar'
import { IconLogout, IconPencil } from '@tabler/icons-react'

import type { State } from '@/entities/store'
import { useAppDispatch } from '@/entities/store'
import type { UpdateUsername } from '@/entities/user/actions'
import {
  Avatar,
  AvatarFallback,
  Button,
  Modal,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/components'

const MAX_NAME_LENGTH = 20

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
            className="flex h-12 w-max max-w-60 cursor-pointer items-center justify-between gap-3 hover:bg-lime-500"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-white">
              {username.length > MAX_NAME_LENGTH
                ? username.slice(0, MAX_NAME_LENGTH - 3) + '...'
                : username}
            </p>
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
            <Button
              variant="destructive"
              onClick={() => dispatch({ type: 'logout' })}
              className="p-2"
              asChild
            >
              <Link to="/auth">
                <IconLogout className="size-5" />
                <span className="text-white">Выйти</span>
              </Link>
            </Button>
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
