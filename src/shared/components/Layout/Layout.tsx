import React from 'react'

import { Body, Content, Header, Navbar } from './components'

export interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return <div className="fixed h-full w-full">{children}</div>
}

Layout.Header = Header
Layout.Navbar = Navbar
Layout.Body = Body
Layout.Content = Content

export { Layout }
