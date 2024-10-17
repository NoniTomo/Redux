import React from 'react'

export type FormNameProps = {
  dispatch: (name: string) => void
  defaultName: string
  isEdit?: boolean
  setEdit?: (isEdit: boolean) => void
} & React.ComponentPropsWithoutRef<'div'>

export const FormName = ({
  dispatch,
  defaultName,
  isEdit = true,
  setEdit = () => {},
  ...props
}: FormNameProps) => {
  const [value, setValue] = React.useState(defaultName)

  return (
    <>
      {isEdit ? (
        <form
          onSubmit={(event) => {
            event.preventDefault()
            dispatch(value)
            setEdit(false)
          }}
        >
          <input
            autoFocus
            name="name"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onBlur={(event) => event.target.form?.requestSubmit()}
          />
        </form>
      ) : (
        <div
          onDoubleClick={() => {
            setEdit(true)
            setValue(defaultName)
          }}
          className="max-w-32 overflow-hidden"
          {...props}
        >
          <p>{defaultName}</p>
        </div>
      )}
    </>
  )
}
