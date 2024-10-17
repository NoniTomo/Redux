import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { IconLogout } from '@tabler/icons-react'

import { Button } from '@/shared/components'

export const LogoutButton = () => {
  const dispatch = useDispatch()

  return (
    <Button variant="destructive" onClick={() => dispatch({ type: 'logout' })} className="p-2" asChild>
      <Link to="/auth">
        <IconLogout className="size-5" />
        <span className="text-white">Выйти</span>
      </Link>
    </Button>
  )
}
