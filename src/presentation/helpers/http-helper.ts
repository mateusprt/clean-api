import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'

export const BAD_REQUEST = (error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const SERVER_ERROR = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}

export const OK = (body = {}): HttpResponse => {
  return {
    statusCode: 200,
    body
  }
}
