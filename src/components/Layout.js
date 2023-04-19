import { Outlet } from 'react-router-dom'

const Layout = ({ children }) => {
  return (
    <main>
      <Outlet />
    </main>
  )
}

export default Layout
