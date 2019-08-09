import * as React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input, Button, Form } from 'antd'
import { ApolloQueryResult } from 'apollo-boost'

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  password: Yup.string().required('Password is required')
})

type LoginCredentials = {
  email: string
  password: string
}

interface LoginFormProps {
  handleSubmit: (credentials: LoginCredentials) => any
  onSuccess?: (params: any) => void
  onFail?: (params: any) => void
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  onSuccess,
  onFail
}) => {
  const onSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const res: ApolloQueryResult<{ login: any }> = await handleSubmit(values)
      const { login } = res.data
      if (login.ok) {
        onSuccess && onSuccess(res)
      } else {
        onFail && onFail(login.error.message)
      }
    } catch (error) {
      onFail && onFail(error)
    }
    setSubmitting(false)
  }
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Item
            hasFeedback={!!(errors.email && touched.email)}
            help={String(errors.email || '')}
            validateStatus={!!(errors.email && touched.email) ? 'error' : ''}
          >
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </Form.Item>
          <Form.Item
            hasFeedback={!!(errors.password && touched.password)}
            help={String(errors.password || '')}
            validateStatus={
              !!(errors.password && touched.password) ? 'error' : ''
            }
          >
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </Form.Item>
          <Button
            htmlType="submit"
            disabled={isSubmitting || !!errors.email || !!errors.password}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
