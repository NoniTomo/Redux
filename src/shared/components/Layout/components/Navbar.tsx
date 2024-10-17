import React from 'react'

export interface NavbarProps {
  children?: React.ReactNode
}

export const Navbar = ({ children }: NavbarProps) => {
  return <div className="col-start-1 col-end-3 p-4">{children}</div>
}
