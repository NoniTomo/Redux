import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'

import { AvatarImage, Button } from '@/shared/components'

const MAX_NAME_LENGTH = 20

export interface AvatarButtonProps {
  name: string
  onClick: () => void
}

export const AvatarButton = ({ onClick, name }: AvatarButtonProps) => (
  <Button
    onClick={onClick}
    variant="ghost"
    className="flex h-12 w-max max-w-60 cursor-pointer items-center justify-between gap-3 hover:bg-lime-500"
  >
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <p className="text-white">
      {name.length > MAX_NAME_LENGTH ? name.slice(0, MAX_NAME_LENGTH - 3) + '...' : name}
    </p>
  </Button>
)
