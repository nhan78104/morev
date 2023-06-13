import { Outlet } from 'react-router-dom'

import { Header } from './'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout
