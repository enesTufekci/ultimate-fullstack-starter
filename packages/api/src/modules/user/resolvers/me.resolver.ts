import { Resolver, Query, Ctx, Authorized } from "type-graphql";
import { User } from "entity/User";
import { Context } from "types";

@Resolver(() => User)
export class MeResolver {

  @Authorized()
  @Query(() => User)
  async me(@Ctx() ctx: Context) {
    return ctx.user
  }
}