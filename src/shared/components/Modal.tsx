import clsx from 'clsx'

export interface ModalProps {
  children?: React.ReactNode
  className?: string
  isOpen: boolean
  open: () => void
}

export const Modal = ({ children, className, isOpen, open }: ModalProps) => (
  <div
    className={clsx(
      'fixed bottom-0 left-0 right-0 top-0 flex h-screen w-screen items-center justify-center bg-slate-400 bg-opacity-55',
      isOpen && 'block',
      !isOpen && 'hidden'
    )}
    onClick={open}
  >
    <div
      onClick={(event) => event.stopPropagation()}
      className={clsx('h-min w-min rounded-md bg-white p-3', className)}
    >
      {children}
    </div>
  </div>
)
