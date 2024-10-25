import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IconLogout, IconPencil } from '@tabler/icons-react'

import { logoutUserRequest } from '@/entities/user/model/logoutUser'
import { userSlice } from '@/entities/user/user.slice'
import { ChangeModal } from '@/features/user/ui/ChangeModal'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/components'
import { useAppDispatch } from '@/shared/lib/store'

const MAX_NAME_LENGTH = 10

export const HeaderMenu = () => {
  const dispatch = useAppDispatch()
  const user = useSelector(userSlice.selectors.selectUser)
  const [isOpenMenu, setOpenMenu] = React.useState(false)
  const [isOpenModal, setOpenModal] = React.useState(false)

  if (!user?.name) return <span className="text-white">Login</span>

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
              {user.name.length > MAX_NAME_LENGTH
                ? user.name.slice(0, MAX_NAME_LENGTH - 3) + '...'
                : user.name}
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
            <Button
              variant="destructive"
              onClick={() => dispatch(logoutUserRequest({}))}
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
      <ChangeModal isOpenModal={isOpenModal} setOpenModal={setOpenModal} />
    </>
  )
}
