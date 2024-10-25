import { Link } from 'react-router-dom'
import { IconLogout } from '@tabler/icons-react'

import { logoutUserRequest } from '@/entities/user/model/logoutUser'
import { Button } from '@/shared/components'
import { useAppDispatch } from '@/shared/lib/store'

export const LogoutButton = () => {
  const dispatch = useAppDispatch()

  return (
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
  )
}
