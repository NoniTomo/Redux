import { IconMenu4, IconPencil, IconTrash } from '@tabler/icons-react'

import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

type MenuProps = {
  deleteFunction: () => void
  editFunction: () => void
  isDeletePending?: boolean
  isChangePending?: boolean
  className?: string
}

export const Menu = ({
  deleteFunction,
  editFunction,
  className,
  isDeletePending = false,
  isChangePending = false,
  ...props
}: MenuProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" className={className} {...props}>
        <IconMenu4 className="size-5" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="flex-column">
      <Button variant="ghost" onClick={editFunction} disabled={isChangePending} className="p-2">
        <IconPencil className="size-5" />
      </Button>
      <Button variant="destructive" onClick={deleteFunction} disabled={isDeletePending} className="p-2">
        <IconTrash className="size-5" />
      </Button>
    </PopoverContent>
  </Popover>
)
