import { MissingParamError } from '../errors/missing-param-error'
import { BAD_REQUEST, OK } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return BAD_REQUEST(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return BAD_REQUEST(new MissingParamError('email'))
    }
    return OK()
  }
}
