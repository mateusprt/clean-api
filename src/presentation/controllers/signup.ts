import { MissingParamError } from '../errors/missing-param-error'
import { BAD_REQUEST, OK } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'password_confirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return BAD_REQUEST(new MissingParamError(field))
      }
    }
    return OK()
  }
}
