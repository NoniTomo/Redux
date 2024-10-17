import { IconMenu4, IconPencil, IconTrash } from '@tabler/icons-react'

import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

type MenuProps = {
  deleteFunction: () => void
  editFunction: () => void
}

export const Menu = ({ deleteFunction, editFunction }: MenuProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" className="p-2">
        <IconMenu4 className="size-5" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="flex-column">
      <Button variant="ghost" onClick={editFunction} className="p-2">
        <IconPencil className="size-5" />
      </Button>
      <Button variant="destructive" onClick={deleteFunction} className="p-2">
        <IconTrash className="size-5" />
      </Button>
    </PopoverContent>
  </Popover>
)
