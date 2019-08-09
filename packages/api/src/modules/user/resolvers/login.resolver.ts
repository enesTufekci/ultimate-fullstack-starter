import { Resolver, Mutation, Args, Ctx, Arg } from 'type-graphql'
import argon2 from 'argon2'

import { User } from 'entity/User'
import { LoginArgs, AuthResponse, Context } from 'types'
import { signToken } from 'auth'

export const WRONG_CREDENTIALS = 'Wrong cretedentials!'

@Resolver()
export class LoginResolver {
  @Mutation(() => AuthResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<AuthResponse> {
    const user = await ctx.db.getRepository(User).findOne({ email })
    if (user) {
      try {
        const verifyPassword = await argon2.verify(user.password, password)
        if (verifyPassword) {
          const token = signToken(String(user.id)) || ''
          ctx.res.setHeader('Authorization', `Bearer ${token}`)
          ctx.res.cookie('Authorization', `Bearer ${token}`)
          return {
            ok: true
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: { subject: WRONG_CREDENTIALS, message: error }
        }
      }
    }
    return {
      ok: false,
      error: { subject: WRONG_CREDENTIALS }
    }
  }
}
