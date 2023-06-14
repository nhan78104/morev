import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Dropdown } from 'antd'
import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../context/AuthProvider'

const Header = () => {
  const { state, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const items = [
    { label: 'Admin', key: 'admin' },
    { label: 'Profile', key: 'profile' },
    { label: 'Logout', key: 'logout' },
  ]

  const onClick = ({ key }) => {
    switch (key) {
      case 'profile':
        navigate('/user')
        break
      case 'logout':
        localStorage.clear()
        sessionStorage.clear()
        dispatch({ type: 'CLEAR_USER_INFO' })
        navigate('/login')
        break
      case 'admin':
        navigate('/admin')
        break
      default:
        break
    }
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container fluid>
        <Link to='/' style={{ color: '#5bcae8', textDecoration: 'none' }}>
          <FontAwesomeIcon icon={faVideoSlash} />
          Morev
        </Link>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
            <Link className='nav-link' to='/'>
              Home
            </Link>
            <Link className='nav-link' to='/watch-list'>
              Watch List
            </Link>
          </Nav>
          {state.isAuthenticated ? (
            <Dropdown menu={{ items, onClick }} trigger={['click']}>
              <Avatar src={state.user.avatarUrl != null ? state.user.avatarUrl : '/public/defaultAvatar.png'} />
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
