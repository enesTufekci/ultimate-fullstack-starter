import * as React from 'react'
import { Layout, Row, Col } from 'antd'

import { LoginForm } from 'forms'
import { useLoginMutation } from 'generated/components'
import { RouteComponentProps, Redirect } from 'react-router'
import { AuthContext } from 'context/Auth'

type LoginVariables = {
  email: string
  password: string
}

const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
  const { authenticated, loading } = React.useContext(AuthContext)
  const [error, setError] = React.useState<string | null>(null)
  const loginHandler = useLoginMutation()

  const onLoginSuccess = () => {
    window.location.replace('/')
  }

  const onLoginFail = () => {
    setError('Wrong credentials')
  }

  const handleLogin = async (variables: LoginVariables) => {
    return await loginHandler({
      variables
    })
  }
  if (loading) {
    return <div>Loading...</div>
  }
  if (authenticated) {
    return <Redirect to="/" />
  }
  return (
    <Layout>
      <Layout.Content
        style={{
          minHeight: '100vh'
        }}
      >
        <Row
          style={{ height: '100vh' }}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col span={6}>
            <LoginForm
              onFail={onLoginFail}
              onSuccess={onLoginSuccess}
              handleSubmit={handleLogin}
            />
            {error && <div>{error}</div>}
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  )
}

export default LoginPage
