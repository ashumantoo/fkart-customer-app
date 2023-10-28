import React, { FC } from 'react'
import { Header } from '../header/header'
import { SubHeader } from '../subheader/sub-header'

interface IProps {
  children: React.ReactNode
}

export const Layout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      <SubHeader />
      {children}
    </>
  )
}