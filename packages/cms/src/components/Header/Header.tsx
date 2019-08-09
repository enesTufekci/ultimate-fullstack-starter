import * as React from 'react'
import { Layout, Menu, Row, Dropdown, Avatar } from 'antd'
import { AuthContext, User, AuthContextValue } from 'context/Auth'
import { Link } from 'react-router-dom'

interface AuthMenuProps {
  user: User
  logout: AuthContextValue['logout']
}

const AuthMenu: React.FC<AuthMenuProps> = ({ user, logout }) => {
  const handleLogout = async () => {
    const res = await logout()
    if (res) {
      window.location.replace('/')
    }
  }
  return (
    <Menu>
      <Menu.Item>
        {user.firstName} {user.lastName}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  )
}

const Header = () => {
  const { user, logout } = React.useContext(AuthContext)
  return (
    <Layout.Header className="header">
      <div className="logo" style={{ float: 'left' }}>
        <Link style={{ color: 'white', fontWeight: 'bold' }} to="/">
          CMS
        </Link>
      </div>

      {user && (
        <Row
          style={{ height: '100%' }}
          type="flex"
          justify="end"
          align="middle"
        >
          <Dropdown
            overlay={<AuthMenu user={user} logout={logout} />}
            trigger={['click']}
          >
            <Avatar icon="user" />
          </Dropdown>
        </Row>
      )}
    </Layout.Header>
  )
}

export default Header
