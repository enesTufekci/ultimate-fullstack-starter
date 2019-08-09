import * as React from 'react'
import { Redirect, Switch, Route, RouteComponentProps } from 'react-router-dom'

import { MainLayout } from 'components/MainLayout'
import { AuthContext } from 'context/Auth'
import { Dashboard } from './Dashboard'

const Guard: React.FC<RouteComponentProps> = () => {
  const { loading, authenticated } = React.useContext(AuthContext)
  if (loading) {
    return <div>Loading...</div>
  }
  if (!loading && !authenticated) {
    return <Redirect to="/login" />
  }
  return (
    <MainLayout>
      <Switch>
        <Route component={Dashboard} />
      </Switch>
    </MainLayout>
  )
}

export default Guard
