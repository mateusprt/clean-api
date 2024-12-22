import { HttpResponse } from '../protocols/http'

export const BAD_REQUEST = (error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const OK = (): HttpResponse => {
  return {
    statusCode: 200,
    body: {}
  }
}
