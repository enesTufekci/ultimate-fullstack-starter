import 'dotenv/config'

import JWT from 'jsonwebtoken'
import { Request } from 'express'

import { User } from 'entity/User'
import { AuthChecker } from 'type-graphql'
import { Context } from 'types'

function parseCookies(cookie?: string) {
  if (!cookie) return {}
  return cookie.split('; ').reduce<{ [key: string]: string }>((acc, next) => {
    const [key, value] = next.split('=')
    return {
      ...acc,
      [key]: decodeURI(value)
    }
  }, {})
}

export const getUser = async (req: Request) => {
  const cookies = parseCookies(req.headers.cookie)
  const cookie = cookies['Authorization']
  if (cookie) {
    const token = cookie.replace('Bearer ', '')
    const decoded = JWT.decode(token)
    const { userId } = decoded as any
    try {
      const user = await User.findOne(userId)
      return user
    } catch (error) {
      console.log(error)
    }
  }
  return null
}

export const signToken = (userId: string) => {
  return userId
    ? JWT.sign(
        {
          audience: 'web',
          userId,
          expiresIn: '1d',
          issuer: process.env.SERVICE_NAME || 'SERVICE_NAME'
        },
        process.env.SERVICE_NAME || 'SERVICE_NAME'
      )
    : null
}

export const authChecker: AuthChecker<Context> = async ({ context }) => {
  const { user } = context
  return !!user
}
