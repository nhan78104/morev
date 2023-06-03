import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Avatar, Dropdown, Menu } from 'antd'

const Header = () => {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const items = [
    { label: 'Profile', key: 'profile' },
    { label: 'Logout', key: 'logout' },
  ]

  const onClick = ({ key }) => {
    console.log(key)
    console.log(user)
    switch (key) {
      case 'profile':
        navigate('/user')
        break
      case 'logout':
        setUser(false)
        navigate('/login')
        break
      default:
        break
    }
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='/' style={{ color: '#5bcae8' }}>
          <FontAwesomeIcon icon={faVideoSlash} />
          Morev
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
            <NavLink className='nav-link' to='/'>
              Home
            </NavLink>
            <NavLink className='nav-link' to='/watch-list'>
              Watch List
            </NavLink>
          </Nav>
          {user ? (
            <Dropdown menu={{ items, onClick }} trigger={['click']}>
              <Avatar src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png' />
            </Dropdown>
          ) : (
            <>
              <Button
                onClick={() => {
                  navigate('/login')
                }}
                variant='outline-info'
                className='me-2'
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate('/sign-up')
                }}
                variant='outline-info'
              >
                Sign Up
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
