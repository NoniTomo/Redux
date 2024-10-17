export interface HeaderProps {
  children: React.ReactNode
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className="fixed left-0 right-0 top-0 flex h-14 w-full items-center justify-between bg-lime-400 px-6">
      {children}
    </header>
  )
}
