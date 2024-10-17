import React from 'react'
import { IconCheck, IconPlus } from '@tabler/icons-react'

import { Button } from '@/shared/components/ui'

type AddButtonProps = {
  dispatch: (name: string) => void
}

export const AddButton = ({ dispatch }: AddButtonProps) => {
  const [value, setValue] = React.useState('')
  const [isEdit, setEdit] = React.useState(false)

  return isEdit ? (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        dispatch(value)
        setEdit(false)
      }}
      onKeyDown={(event) => event.key === 'Escape' && setEdit(false)}
      className="m-auto flex w-full max-w-96 flex-nowrap items-center px-2"
    >
      <input
        autoFocus
        name="name"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="h-6 w-8/12"
      />
      <div className="flex w-4/12 items-center justify-center">
        <Button className="p-2" type="submit" variant="ghost">
          <IconCheck className="size-5" />
        </Button>
      </div>
    </form>
  ) : (
    <Button
      onClick={() => {
        setEdit(true)
      }}
      variant="ghost"
      className="m-auto flex w-full max-w-96"
    >
      <IconPlus className="size-5" />
      Добавить
    </Button>
  )
}
