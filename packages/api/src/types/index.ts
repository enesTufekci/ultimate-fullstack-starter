import { ObjectType, Field, ArgsType, InputType } from 'type-graphql'
import { Request, Response } from 'express'
import { Connection } from 'typeorm'

export interface Context {
  req: Request
  res: Response
  authToken: String
  db: Connection
  user: {
    id: string | number
    name: string
    roles?: string[]
  }
}

@ArgsType()
export class LoginArgs {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
export class Error {
  @Field()
  subject: string

  @Field({ nullable: true })
  message?: string
}

@ObjectType()
export class AuthResponse {
  @Field()
  ok: Boolean

  @Field({ nullable: true })
  error?: Error
}

@ObjectType()
export class Result {
  @Field({ nullable: true })
  error?: Error
}

@InputType()
export class SearchInput {
  @Field({ nullable: true })
  skip?: number

  @Field({ nullable: true })
  take?: number

  @Field({ nullable: true })
  query?: string
}
