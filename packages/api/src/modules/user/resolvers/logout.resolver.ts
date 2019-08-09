import { Resolver, Ctx, Mutation } from 'type-graphql'
import { AuthResponse, Context } from 'types'

@Resolver()
export class LogoutResolver {
  @Mutation(() => AuthResponse)
  async logout(@Ctx() ctx: Context) {
    ctx.res.clearCookie('Authorization')
    return {
      ok: true
    }
  }
}
