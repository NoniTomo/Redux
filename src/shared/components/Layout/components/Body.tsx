import React from 'react'

export interface BodyProps {
  children: React.ReactNode
}

export const Body = ({ children }: BodyProps) => (
  <div className="grid h-full w-full grid-cols-7 py-12">{children}</div>
)
