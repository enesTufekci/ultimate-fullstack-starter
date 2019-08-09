import { Resolver, Mutation, Arg } from 'type-graphql'
import { User } from 'entity/User'
import { AuthResponse } from 'types'

const SOMETHING_WENT_WRONG = 'Something went wrong!'

@Resolver()
export class RegisterResolver {
  @Mutation(() => AuthResponse)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string
  ) {
    try {
      const user = await User.create({
        email,
        password,
        firstName,
        lastName
      }).save()

      if (user) {
        return {
          ok: true
        }
      }
    } catch (error) {
      return {
        ok: false,
        error: {
          subject: SOMETHING_WENT_WRONG,
          message: error
        }
      }
    }
    return {
      ok: false,
      error: {
        subject: SOMETHING_WENT_WRONG
      }
    }
  }
}
