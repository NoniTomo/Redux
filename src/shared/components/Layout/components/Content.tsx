import React from 'react'

export interface ContentProps {
  children?: React.ReactNode
}

export const Content = ({ children }: ContentProps) => {
  return <div className="col-start-3 col-end-8 p-4">{children}</div>
}
