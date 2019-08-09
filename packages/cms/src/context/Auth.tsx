import * as React from 'react'
import {
  useMeQuery,
  useLogoutMutation,
  AuthResponse
} from 'generated/components'

export interface User {
  firstName: string
  lastName: string
  email: string
}

export interface AuthContextValue {
  user: User | null
  authenticated: boolean
  loading: boolean
  logout: () => Promise<AuthResponse | boolean>
}

export const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  authenticated: false,
  loading: false,
  logout: () => Promise.resolve(false)
})

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [authenticated, setAuthenticated] = React.useState(false)
  const { data, error, loading: loadingMe } = useMeQuery()
  const [loading, setLoading] = React.useState(!!loadingMe)
  const logoutHandler = useLogoutMutation()

  React.useEffect(() => {
    if (data && data.me) {
      const { me } = data
      const { email, firstName, lastName } = me

      if (email && firstName) {
        setUser({ email, firstName, lastName })
        setAuthenticated(true)
      }
    }
    if (!loadingMe) {
      setLoading(false)
    }
  }, [data, error, loadingMe])

  const logout = async (): Promise<AuthResponse | false> => {
    try {
      return (await logoutHandler()) as any
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, authenticated, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
