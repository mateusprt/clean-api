import { MissingParamError } from '../errors/missing-param-error'
import { BAD_REQUEST, OK } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return BAD_REQUEST(new MissingParamError(field))
      }
    }
    return OK()
  }
}
