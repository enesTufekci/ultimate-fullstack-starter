import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import cookie from 'cookie'
import { Login } from 'pages/Login'
import Guard from 'pages/Guard'
import { AuthProvider } from 'context/Auth'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      return false
    })
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext((_, { headers }) => {
  const token = cookie.parse('Authorization')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = createHttpLink({
  credentials: 'include'
})

const client = new ApolloClient({
  connectToDevTools: true,
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Guard} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  )
}

export default App
