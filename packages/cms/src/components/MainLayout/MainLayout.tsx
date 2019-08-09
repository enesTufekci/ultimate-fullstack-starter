import * as React from 'react'
import { Layout } from 'antd'

import { Header } from '../Header'
import { Breadcrumb } from '../Breadcrumb'
import { Sidebar } from '../Sidebar'

const { Content } = Layout

const MainLayout: React.FC = ({ children }) => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sidebar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb items={['Dashboard']} />
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 600
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout
