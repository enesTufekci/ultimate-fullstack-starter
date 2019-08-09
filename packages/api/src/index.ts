import 'dotenv/config'

import { ApolloServer } from 'apollo-server'
import { createConnection } from 'typeorm'
import { buildSchema } from 'type-graphql'

import { getUser, authChecker } from 'auth'

async function main() {
  const connection = await createConnection()

  const schema = await buildSchema({
    resolvers: [
      __dirname + '/modules/**/*.resolver.ts',
      __dirname + '/resolvers/**/*.ts'
    ],
    authChecker
  })

  const server = new ApolloServer({
    schema,
    context: async ({ req, res }) => ({
      req,
      res,
      db: connection,
      user: await getUser(req)
    })
  })

  server.listen(process.env.PORT || 6000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
