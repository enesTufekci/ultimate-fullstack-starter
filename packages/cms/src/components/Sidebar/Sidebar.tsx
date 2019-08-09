import * as React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'

const { Sider } = Layout
const { SubMenu } = Menu

const Sidebar: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[history.location.pathname]}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="user" />
              Users
            </span>
          }
        >
          <Menu.Item key="/users">
            <Link to="/users">List</Link>
          </Menu.Item>
          <Menu.Item key="/users/create">
            <Link to="/users/create">Create</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default withRouter(Sidebar)
