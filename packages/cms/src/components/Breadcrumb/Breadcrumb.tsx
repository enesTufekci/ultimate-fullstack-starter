import * as React from 'react'

import { Breadcrumb } from 'antd'

export interface BreadcrumbProps {
  items: any[]
}

export default ({ items }: BreadcrumbProps) => {
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {items.map(item => (
        <Breadcrumb.Item key={item}>Home</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}
